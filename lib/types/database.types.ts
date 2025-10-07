export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'Admin' | 'Manager' | 'Estimator' | 'Viewer' | 'Client'
          custom_permissions: Json | null
          created_at: string
        }
        Insert: {
          id: string
          role?: 'Admin' | 'Manager' | 'Estimator' | 'Viewer' | 'Client'
          custom_permissions?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'Admin' | 'Manager' | 'Estimator' | 'Viewer' | 'Client'
          custom_permissions?: Json | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          address: Json
          entity_num: string | null
          budget: number | null
          status: 'Draft' | 'In Progress' | 'Complete' | 'On Hold' | 'Cancelled'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: Json
          entity_num?: string | null
          budget?: number | null
          status?: 'Draft' | 'In Progress' | 'Complete' | 'On Hold' | 'Cancelled'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: Json
          entity_num?: string | null
          budget?: number | null
          status?: 'Draft' | 'In Progress' | 'Complete' | 'On Hold' | 'Cancelled'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      property_infos: {
        Row: {
          id: string
          project_id: string
          region_id: string | null
          rent_amount: number | null
          sq_ft_bpo: number | null
          sq_ft_actual: number | null
          bedrooms: number | null
          bathrooms: number | null
          facade_type: string | null
          garage_type: string | null
          garage_size: number | null
          has_basement: boolean | null
          floors: number | null
          foundation_area: number | null
          roof_area: number | null
          roof_age: number | null
          hvac_age: number | null
          water_heater_age: number | null
          utilities: Json | null
          safety_checklist: Json | null
          notes: string | null
        }
        Insert: {
          id?: string
          project_id: string
          region_id?: string | null
          rent_amount?: number | null
          sq_ft_bpo?: number | null
          sq_ft_actual?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          facade_type?: string | null
          garage_type?: string | null
          garage_size?: number | null
          has_basement?: boolean | null
          floors?: number | null
          foundation_area?: number | null
          roof_area?: number | null
          roof_age?: number | null
          hvac_age?: number | null
          water_heater_age?: number | null
          utilities?: Json | null
          safety_checklist?: Json | null
          notes?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          region_id?: string | null
          rent_amount?: number | null
          sq_ft_bpo?: number | null
          sq_ft_actual?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          facade_type?: string | null
          garage_type?: string | null
          garage_size?: number | null
          has_basement?: boolean | null
          floors?: number | null
          foundation_area?: number | null
          roof_area?: number | null
          roof_age?: number | null
          hvac_age?: number | null
          water_heater_age?: number | null
          utilities?: Json | null
          safety_checklist?: Json | null
          notes?: string | null
        }
      }
      rooms: {
        Row: {
          id: string
          property_info_id: string
          name: string
          length: number | null
          width: number | null
          misc_sf: number | null
          misc_note: string | null
          total_sf: number | null
        }
        Insert: {
          id?: string
          property_info_id: string
          name: string
          length?: number | null
          width?: number | null
          misc_sf?: number | null
          misc_note?: string | null
          total_sf?: number | null
        }
        Update: {
          id?: string
          property_info_id?: string
          name?: string
          length?: number | null
          width?: number | null
          misc_sf?: number | null
          misc_note?: string | null
          total_sf?: number | null
        }
      }
      regions: {
        Row: {
          id: string
          name: string
          state: string
          location_factor: number
          rsmeans_factor: number
          contingency: number
          traditional: number | null
          tax_rate: number
        }
        Insert: {
          id?: string
          name: string
          state: string
          location_factor: number
          rsmeans_factor: number
          contingency: number
          traditional?: number | null
          tax_rate: number
        }
        Update: {
          id?: string
          name?: string
          state?: string
          location_factor?: number
          rsmeans_factor?: number
          contingency?: number
          traditional?: number | null
          tax_rate?: number
        }
      }
      unit_costs: {
        Row: {
          id: string
          category: string
          subcategory: string | null
          action_item: string
          description: string | null
          unit: string
          sku: string | null
          material_cost: number
          labor_cost: number
          labor_hours: number | null
          oh_profit: number
          workmans_comp: number
          insurance: number
          gc_fee: number
          is_active: boolean
          effective_date: string
          notes: string | null
          region_id: string | null
        }
        Insert: {
          id?: string
          category: string
          subcategory?: string | null
          action_item: string
          description?: string | null
          unit: string
          sku?: string | null
          material_cost: number
          labor_cost: number
          labor_hours?: number | null
          oh_profit?: number
          workmans_comp?: number
          insurance?: number
          gc_fee?: number
          is_active?: boolean
          effective_date?: string
          notes?: string | null
          region_id?: string | null
        }
        Update: {
          id?: string
          category?: string
          subcategory?: string | null
          action_item?: string
          description?: string | null
          unit?: string
          sku?: string | null
          material_cost?: number
          labor_cost?: number
          labor_hours?: number | null
          oh_profit?: number
          workmans_comp?: number
          insurance?: number
          gc_fee?: number
          is_active?: boolean
          effective_date?: string
          notes?: string | null
          region_id?: string | null
        }
      }
      estimates: {
        Row: {
          id: string
          project_id: string
          version: number
          spec_package: 'Standard' | 'Traditional' | 'Custom'
          valid_until: string | null
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          project_id: string
          version?: number
          spec_package?: 'Standard' | 'Traditional' | 'Custom'
          valid_until?: string | null
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          project_id?: string
          version?: number
          spec_package?: 'Standard' | 'Traditional' | 'Custom'
          valid_until?: string | null
          created_at?: string
          created_by?: string
        }
      }
      estimate_line_items: {
        Row: {
          id: string
          estimate_id: string
          room_name: string
          category: string
          is_required: boolean
          unit_cost_id: string | null
          action_description: string
          sku: string | null
          quantity: number
          unit: string
          unit_cost: number
          total_cost: number | null
          notes: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          estimate_id: string
          room_name: string
          category: string
          is_required?: boolean
          unit_cost_id?: string | null
          action_description: string
          sku?: string | null
          quantity: number
          unit: string
          unit_cost: number
          total_cost?: number | null
          notes?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          estimate_id?: string
          room_name?: string
          category?: string
          is_required?: boolean
          unit_cost_id?: string | null
          action_description?: string
          sku?: string | null
          quantity?: number
          unit?: string
          unit_cost?: number
          total_cost?: number | null
          notes?: string | null
          sort_order?: number
        }
      }
      vendors: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          tax_rate: number | null
          notes: string | null
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          tax_rate?: number | null
          notes?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          tax_rate?: number | null
          notes?: string | null
        }
      }
      purchase_orders: {
        Row: {
          id: string
          po_number: string
          project_id: string
          vendor_id: string
          date: string
          delivery_address: string | null
          delivery_date: string | null
          special_instructions: string | null
          status: 'Draft' | 'Submitted' | 'Confirmed' | 'Received' | 'Cancelled'
          subtotal: number | null
          tax: number | null
          shipping: number | null
          grand_total: number | null
          hd_pro_account: string | null
          vendor_email: string | null
          store_location: string | null
          mav_contact: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          po_number: string
          project_id: string
          vendor_id: string
          date: string
          delivery_address?: string | null
          delivery_date?: string | null
          special_instructions?: string | null
          status?: 'Draft' | 'Submitted' | 'Confirmed' | 'Received' | 'Cancelled'
          subtotal?: number | null
          tax?: number | null
          shipping?: number | null
          grand_total?: number | null
          hd_pro_account?: string | null
          vendor_email?: string | null
          store_location?: string | null
          mav_contact?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          po_number?: string
          project_id?: string
          vendor_id?: string
          date?: string
          delivery_address?: string | null
          delivery_date?: string | null
          special_instructions?: string | null
          status?: 'Draft' | 'Submitted' | 'Confirmed' | 'Received' | 'Cancelled'
          subtotal?: number | null
          tax?: number | null
          shipping?: number | null
          grand_total?: number | null
          hd_pro_account?: string | null
          vendor_email?: string | null
          store_location?: string | null
          mav_contact?: string | null
          created_by?: string
          created_at?: string
        }
      }
      po_line_items: {
        Row: {
          id: string
          po_id: string
          line_number: number
          description: string
          quantity: number
          unit: string
          unit_cost: number
          sku: string | null
          total_cost: number | null
          scope_category: string | null
          notes: string | null
          quantity_received: number
        }
        Insert: {
          id?: string
          po_id: string
          line_number: number
          description: string
          quantity: number
          unit: string
          unit_cost: number
          sku?: string | null
          total_cost?: number | null
          scope_category?: string | null
          notes?: string | null
          quantity_received?: number
        }
        Update: {
          id?: string
          po_id?: string
          line_number?: number
          description?: string
          quantity?: number
          unit?: string
          unit_cost?: number
          sku?: string | null
          total_cost?: number | null
          scope_category?: string | null
          notes?: string | null
          quantity_received?: number
        }
      }
      photos: {
        Row: {
          id: string
          property_info_id: string
          url: string
          category: 'Initial' | 'During Progress' | 'Final'
          uploaded_by: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          property_info_id: string
          url: string
          category: 'Initial' | 'During Progress' | 'Final'
          uploaded_by: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          property_info_id?: string
          url?: string
          category?: 'Initial' | 'During Progress' | 'Final'
          uploaded_by?: string
          uploaded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
