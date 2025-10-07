-- Renovation Estimator Pro Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'Estimator', 'Viewer', 'Client');
CREATE TYPE project_status AS ENUM ('Draft', 'In Progress', 'Complete', 'On Hold', 'Cancelled');
CREATE TYPE spec_package_type AS ENUM ('Standard', 'Traditional', 'Custom');
CREATE TYPE po_status AS ENUM ('Draft', 'Submitted', 'Confirmed', 'Received', 'Cancelled');
CREATE TYPE photo_category AS ENUM ('Initial', 'During Progress', 'Final');

-- Profiles Table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'Estimator',
  custom_permissions JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'Admin'
    )
  );

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address JSONB NOT NULL, -- {street, city, state, zip}
  entity_num TEXT,
  budget NUMERIC(12, 2),
  status project_status NOT NULL DEFAULT 'Draft',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view projects they created or are assigned to" ON projects
  FOR SELECT USING (
    created_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
  );

CREATE POLICY "Authorized users can create projects" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Estimator'))
  );

CREATE POLICY "Authorized users can update projects" ON projects
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
  );

-- Regions Table
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  location_factor NUMERIC(5, 4) NOT NULL,
  rsmeans_factor NUMERIC(5, 4) NOT NULL,
  contingency NUMERIC(5, 4) NOT NULL,
  traditional NUMERIC(5, 4),
  tax_rate NUMERIC(5, 4) NOT NULL
);

-- Enable RLS
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for regions (read-only for all authenticated users)
CREATE POLICY "All users can view regions" ON regions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and Managers can manage regions" ON regions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
  );

-- Property Info Table
CREATE TABLE property_infos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  region_id UUID REFERENCES regions(id),
  rent_amount NUMERIC(10, 2),
  sq_ft_bpo NUMERIC(10, 2),
  sq_ft_actual NUMERIC(10, 2),
  bedrooms INT,
  bathrooms NUMERIC(3, 1),
  facade_type TEXT,
  garage_type TEXT,
  garage_size NUMERIC(10, 2),
  has_basement BOOLEAN,
  floors INT,
  foundation_area NUMERIC(10, 2),
  roof_area NUMERIC(10, 2),
  roof_age INT,
  hvac_age INT,
  water_heater_age INT,
  utilities JSONB, -- {gas_on, water_on, power_on}
  safety_checklist JSONB, -- {breakers_off, water_main_off, lockbox_code}
  notes TEXT
);

-- Enable RLS
ALTER TABLE property_infos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for property_infos (inherit from projects)
CREATE POLICY "Users can view property info for accessible projects" ON property_infos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects WHERE id = property_infos.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Rooms Table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_info_id UUID NOT NULL REFERENCES property_infos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  length NUMERIC(10, 2),
  width NUMERIC(10, 2),
  misc_sf NUMERIC(10, 2),
  misc_note TEXT,
  total_sf NUMERIC(10, 2) GENERATED ALWAYS AS (
    COALESCE(length * width, 0) + COALESCE(misc_sf, 0)
  ) STORED
);

-- Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rooms (inherit from property_infos)
CREATE POLICY "Users can view rooms for accessible properties" ON rooms
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM property_infos pi
      JOIN projects p ON pi.project_id = p.id
      WHERE pi.id = rooms.property_info_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Unit Costs Table
CREATE TABLE unit_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  subcategory TEXT,
  action_item TEXT NOT NULL,
  description TEXT,
  unit TEXT NOT NULL,
  sku TEXT,
  material_cost NUMERIC(10, 2) NOT NULL,
  labor_cost NUMERIC(10, 2) NOT NULL,
  labor_hours NUMERIC(10, 2),
  oh_profit NUMERIC(5, 4) NOT NULL DEFAULT 0.06,
  workmans_comp NUMERIC(5, 4) NOT NULL DEFAULT 0.01,
  insurance NUMERIC(5, 4) NOT NULL DEFAULT 0.01,
  gc_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  region_id UUID REFERENCES regions(id)
);

-- Create index for faster searches
CREATE INDEX idx_unit_costs_category ON unit_costs(category);
CREATE INDEX idx_unit_costs_active ON unit_costs(is_active);
CREATE INDEX idx_unit_costs_region ON unit_costs(region_id);

-- Enable RLS
ALTER TABLE unit_costs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for unit_costs
CREATE POLICY "All users can view active unit costs" ON unit_costs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins and Managers can manage unit costs" ON unit_costs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
  );

-- Estimates Table
CREATE TABLE estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version INT NOT NULL DEFAULT 1,
  spec_package spec_package_type NOT NULL DEFAULT 'Standard',
  valid_until DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for estimates (inherit from projects)
CREATE POLICY "Users can view estimates for accessible projects" ON estimates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects WHERE id = estimates.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Estimate Line Items Table
CREATE TABLE estimate_line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  room_name TEXT NOT NULL,
  category TEXT NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT true,
  unit_cost_id UUID REFERENCES unit_costs(id),
  action_description TEXT NOT NULL,
  sku TEXT,
  quantity NUMERIC(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  unit_cost NUMERIC(10, 2) NOT NULL,
  total_cost NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
  notes TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Create indexes
CREATE INDEX idx_estimate_line_items_estimate ON estimate_line_items(estimate_id);
CREATE INDEX idx_estimate_line_items_room ON estimate_line_items(room_name);

-- Enable RLS
ALTER TABLE estimate_line_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for estimate_line_items (inherit from estimates)
CREATE POLICY "Users can view line items for accessible estimates" ON estimate_line_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM estimates e
      JOIN projects p ON e.project_id = p.id
      WHERE e.id = estimate_line_items.estimate_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Vendors Table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  tax_rate NUMERIC(5, 4),
  notes TEXT
);

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vendors
CREATE POLICY "All users can view vendors" ON vendors
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and Managers can manage vendors" ON vendors
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
  );

-- Purchase Orders Table
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_number TEXT UNIQUE NOT NULL,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  date DATE NOT NULL,
  delivery_address TEXT,
  delivery_date DATE,
  special_instructions TEXT,
  status po_status NOT NULL DEFAULT 'Draft',
  subtotal NUMERIC(12, 2),
  tax NUMERIC(12, 2),
  shipping NUMERIC(12, 2),
  grand_total NUMERIC(12, 2),
  hd_pro_account TEXT,
  vendor_email TEXT,
  store_location TEXT,
  mav_contact TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_purchase_orders_project ON purchase_orders(project_id);

-- Enable RLS
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for purchase_orders
CREATE POLICY "Users can view POs for accessible projects" ON purchase_orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects WHERE id = purchase_orders.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- PO Line Items Table
CREATE TABLE po_line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  line_number INT NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  unit_cost NUMERIC(10, 2) NOT NULL,
  sku TEXT,
  total_cost NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
  scope_category TEXT,
  notes TEXT,
  quantity_received NUMERIC(10, 2) NOT NULL DEFAULT 0
);

-- Create index
CREATE INDEX idx_po_line_items_po ON po_line_items(po_id);

-- Enable RLS
ALTER TABLE po_line_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for po_line_items (inherit from purchase_orders)
CREATE POLICY "Users can view PO line items for accessible POs" ON po_line_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM purchase_orders po
      JOIN projects p ON po.project_id = p.id
      WHERE po.id = po_line_items.po_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Photos Table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_info_id UUID NOT NULL REFERENCES property_infos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  category photo_category NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_photos_property ON photos(property_info_id);

-- Enable RLS
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for photos
CREATE POLICY "Users can view photos for accessible properties" ON photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM property_infos pi
      JOIN projects p ON pi.project_id = p.id
      WHERE pi.id = photos.property_info_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Activity Log Table (Audit Trail)
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_activity_log_project ON activity_log(project_id);
CREATE INDEX idx_activity_log_timestamp ON activity_log(timestamp DESC);

-- Enable RLS
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for activity_log
CREATE POLICY "Users can view activity for accessible projects" ON activity_log
  FOR SELECT USING (
    project_id IS NULL OR
    EXISTS (
      SELECT 1 FROM projects WHERE id = activity_log.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for projects table
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'Estimator');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample regions
INSERT INTO regions (name, state, location_factor, rsmeans_factor, contingency, traditional, tax_rate) VALUES
('Illinois', 'IL', -0.0390, 1.2100, 0.2100, NULL, 0.0625),
('California', 'CA', 0.1500, 1.3500, 0.2100, NULL, 0.0725),
('Florida - Miami', 'FL', 0.0800, 1.2500, 0.2100, NULL, 0.0700),
('New Jersey - Central', 'NJ', 0.1200, 1.2800, 0.2100, NULL, 0.0663);

-- Insert sample vendors
INSERT INTO vendors (name, email, phone, tax_rate) VALUES
('Home Depot', 'Business_Services@homedepot.com', '1-800-466-3337', 0.0625),
('Lowe''s', 'pro@lowes.com', '1-877-465-6937', 0.0625);
