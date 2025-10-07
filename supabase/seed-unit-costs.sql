-- Sample Unit Costs for Renovation Estimator Pro
-- Run this after the main schema.sql

-- PAINTING
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Painting', 'Interior', 'Paint walls and ceiling', 'Interior latex paint, 2 coats', 'SF', 0.50, 1.50, 0.05),
('Painting', 'Interior', 'Paint trim and baseboards', 'Semi-gloss trim paint', 'LF', 0.25, 1.75, 0.08),
('Painting', 'Exterior', 'Paint exterior walls', 'Exterior acrylic paint, 2 coats', 'SF', 0.75, 2.00, 0.06),
('Painting', 'Doors', 'Paint interior door', 'Paint both sides of door', 'EA', 15.00, 45.00, 1.5);

-- FLOORING
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, sku, material_cost, labor_cost, labor_hours) VALUES
('Flooring', 'Carpet', 'Install carpet with pad', 'Builder grade carpet with standard pad', 'SF', 'CARPET-BLD-01', 2.50, 1.50, 0.15),
('Flooring', 'Carpet', 'Install mid-grade carpet', 'Mid-grade nylon carpet with upgraded pad', 'SF', 'CARPET-MID-01', 3.50, 1.50, 0.15),
('Flooring', 'Hardwood', 'Install hardwood flooring', 'Engineered hardwood 3/8" thick', 'SF', 'HW-ENG-01', 5.00, 3.00, 0.20),
('Flooring', 'Hardwood', 'Refinish hardwood floor', 'Sand and refinish existing hardwood', 'SF', NULL, 0.75, 2.25, 0.18),
('Flooring', 'Tile', 'Install ceramic tile', '12x12 ceramic floor tile', 'SF', 'TILE-CER-12', 3.00, 4.00, 0.25),
('Flooring', 'Tile', 'Install porcelain tile', '12x24 porcelain floor tile', 'SF', 'TILE-POR-1224', 4.50, 5.00, 0.30),
('Flooring', 'Vinyl', 'Install luxury vinyl plank', 'LVP click-lock flooring', 'SF', 'LVP-CLICK-01', 2.75, 2.00, 0.12),
('Flooring', 'Vinyl', 'Install sheet vinyl', 'Sheet vinyl flooring', 'SF', 'VINYL-SHEET-01', 1.50, 1.50, 0.10);

-- KITCHEN
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Kitchen', 'Cabinets', 'Install base cabinets', 'Stock base cabinets 24" deep', 'LF', 200.00, 100.00, 3.0),
('Kitchen', 'Cabinets', 'Install wall cabinets', 'Stock wall cabinets 12" deep', 'LF', 150.00, 75.00, 2.5),
('Kitchen', 'Countertops', 'Install laminate countertop', 'Formica laminate countertop', 'LF', 35.00, 25.00, 1.0),
('Kitchen', 'Countertops', 'Install granite countertop', 'Granite slab countertop', 'SF', 45.00, 15.00, 0.5),
('Kitchen', 'Sink', 'Install kitchen sink', 'Stainless steel double bowl sink', 'EA', 150.00, 125.00, 2.0),
('Kitchen', 'Faucet', 'Install kitchen faucet', 'Single handle pull-down faucet', 'EA', 120.00, 80.00, 1.5),
('Kitchen', 'Backsplash', 'Install tile backsplash', '3x6 subway tile backsplash', 'SF', 8.00, 12.00, 0.75);

-- BATHROOM
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Bathroom', 'Fixtures', 'Install toilet', 'Standard 2-piece toilet', 'EA', 150.00, 150.00, 2.0),
('Bathroom', 'Fixtures', 'Install vanity', '24" vanity with top', 'EA', 250.00, 125.00, 2.5),
('Bathroom', 'Fixtures', 'Install tub/shower combo', 'Fiberglass tub/shower unit', 'EA', 400.00, 400.00, 6.0),
('Bathroom', 'Fixtures', 'Install shower stall', 'Fiberglass shower stall 36x36', 'EA', 350.00, 350.00, 5.0),
('Bathroom', 'Tile', 'Install shower tile', 'Ceramic wall tile in shower', 'SF', 5.00, 10.00, 0.60),
('Bathroom', 'Faucet', 'Install bathroom faucet', 'Single handle bathroom faucet', 'EA', 60.00, 60.00, 1.0),
('Bathroom', 'Accessories', 'Install towel bar', 'Chrome towel bar 24"', 'EA', 25.00, 30.00, 0.5),
('Bathroom', 'Accessories', 'Install toilet paper holder', 'Chrome toilet paper holder', 'EA', 15.00, 20.00, 0.3);

-- ELECTRICAL
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Electrical', 'Outlets', 'Install electrical outlet', 'Standard duplex outlet', 'EA', 5.00, 45.00, 0.5),
('Electrical', 'Switches', 'Install light switch', 'Standard single-pole switch', 'EA', 3.00, 40.00, 0.5),
('Electrical', 'Fixtures', 'Install light fixture', 'Standard ceiling light fixture', 'EA', 50.00, 75.00, 1.0),
('Electrical', 'Fixtures', 'Install ceiling fan', 'Ceiling fan with light kit', 'EA', 150.00, 125.00, 2.0),
('Electrical', 'Panel', 'Install electrical panel', '200 amp electrical panel', 'EA', 400.00, 600.00, 8.0),
('Electrical', 'GFCI', 'Install GFCI outlet', 'GFCI protected outlet', 'EA', 15.00, 50.00, 0.75);

-- PLUMBING
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Plumbing', 'Pipes', 'Replace water supply line', 'PEX water supply line', 'LF', 3.00, 12.00, 0.5),
('Plumbing', 'Pipes', 'Replace drain line', 'PVC drain line', 'LF', 5.00, 15.00, 0.75),
('Plumbing', 'Water Heater', 'Install water heater', '40 gallon gas water heater', 'EA', 450.00, 350.00, 4.0),
('Plumbing', 'Water Heater', 'Install tankless water heater', 'Tankless gas water heater', 'EA', 1200.00, 600.00, 6.0);

-- HVAC
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('HVAC', 'AC Unit', 'Install AC unit', '3-ton central AC unit', 'EA', 2500.00, 1500.00, 12.0),
('HVAC', 'Furnace', 'Install gas furnace', '80% efficiency gas furnace', 'EA', 1800.00, 1200.00, 10.0),
('HVAC', 'Ductwork', 'Install ductwork', 'Sheet metal ductwork', 'LF', 15.00, 25.00, 1.0),
('HVAC', 'Register', 'Install floor register', 'Standard floor register', 'EA', 15.00, 25.00, 0.5);

-- DOORS & WINDOWS
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Doors', 'Interior', 'Install interior door', '6-panel hollow core door with frame', 'EA', 150.00, 150.00, 3.0),
('Doors', 'Exterior', 'Install exterior door', 'Steel entry door with frame', 'EA', 400.00, 250.00, 4.0),
('Doors', 'Hardware', 'Install door hardware', 'Satin nickel door knob', 'EA', 25.00, 35.00, 0.5),
('Windows', 'Replacement', 'Install replacement window', 'Vinyl double-hung window', 'EA', 300.00, 200.00, 3.0),
('Windows', 'Blinds', 'Install window blinds', 'Vinyl mini blinds', 'EA', 20.00, 30.00, 0.5);

-- TRIM & MOLDING
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Trim', 'Baseboard', 'Install baseboard', '3.5" colonial baseboard', 'LF', 1.50, 2.50, 0.15),
('Trim', 'Crown', 'Install crown molding', '3.5" crown molding', 'LF', 2.00, 4.00, 0.25),
('Trim', 'Casing', 'Install door casing', '2.5" door casing', 'LF', 1.25, 2.00, 0.15);

-- DRYWALL
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Drywall', 'Install', 'Hang and finish drywall', '1/2" drywall hung and finished', 'SF', 0.75, 1.25, 0.10),
('Drywall', 'Repair', 'Repair drywall', 'Patch and repair drywall', 'SF', 0.50, 2.00, 0.15),
('Drywall', 'Texture', 'Texture drywall', 'Orange peel texture', 'SF', 0.15, 0.50, 0.05);

-- ROOFING
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Roofing', 'Shingles', 'Install asphalt shingles', '30-year architectural shingles', 'SF', 1.50, 2.00, 0.10),
('Roofing', 'Shingles', 'Remove old shingles', 'Tear off existing shingles', 'SF', 0.00, 1.00, 0.05),
('Roofing', 'Gutters', 'Install gutters', '5" aluminum gutters', 'LF', 5.00, 7.00, 0.30);

-- EXTERIOR
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Exterior', 'Siding', 'Install vinyl siding', 'Vinyl siding with insulation', 'SF', 3.00, 4.00, 0.20),
('Exterior', 'Deck', 'Build deck', 'Pressure-treated deck', 'SF', 12.00, 15.00, 0.75),
('Exterior', 'Fence', 'Install wood fence', '6ft privacy fence', 'LF', 20.00, 15.00, 0.50),
('Exterior', 'Concrete', 'Pour concrete driveway', '4" concrete driveway', 'SF', 4.00, 4.00, 0.15);

-- GENERAL/DEMO
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('General', 'Demolition', 'General demolition', 'Labor and disposal', 'HR', 0.00, 50.00, 1.0),
('General', 'Cleanup', 'Final cleaning', 'Final clean and detail', 'SF', 0.10, 0.40, 0.02),
('General', 'Dumpster', 'Dumpster rental', '20 yard dumpster rental', 'EA', 400.00, 0.00, 0.0),
('General', 'Permits', 'Building permit', 'General building permit', 'EA', 300.00, 0.00, 0.0);

-- APPLIANCES
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Appliances', 'Range', 'Install electric range', 'Standard electric range', 'EA', 600.00, 150.00, 2.0),
('Appliances', 'Refrigerator', 'Install refrigerator', 'Standard refrigerator', 'EA', 800.00, 100.00, 1.0),
('Appliances', 'Dishwasher', 'Install dishwasher', 'Built-in dishwasher', 'EA', 400.00, 200.00, 2.5),
('Appliances', 'Microwave', 'Install microwave', 'Over-range microwave', 'EA', 200.00, 100.00, 1.5),
('Appliances', 'Disposal', 'Install garbage disposal', '1/2 HP garbage disposal', 'EA', 100.00, 100.00, 1.5);

-- SMOKE/CO DETECTORS
INSERT INTO unit_costs (category, subcategory, action_item, description, unit, material_cost, labor_cost, labor_hours) VALUES
('Safety', 'Smoke Detector', 'Install smoke detector', 'Hardwired smoke detector', 'EA', 25.00, 50.00, 0.75),
('Safety', 'CO Detector', 'Install CO detector', 'Carbon monoxide detector', 'EA', 30.00, 50.00, 0.75);
