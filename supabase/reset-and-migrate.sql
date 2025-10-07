-- Safe Migration Script
-- Run this in Supabase SQL Editor to update your schema without errors

-- Drop existing tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS material_expenses CASCADE;
DROP TABLE IF EXISTS po_line_items CASCADE;
DROP TABLE IF EXISTS purchase_orders CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS estimate_line_items CASCADE;
DROP TABLE IF EXISTS estimates CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS property_infos CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS unit_costs CASCADE;
DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS estimate_status CASCADE;
DROP TYPE IF EXISTS po_status CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- Now run the full schema
-- Copy the ENTIRE contents of schema.sql below this line
