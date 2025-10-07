-- Clean Install Script for Supabase
-- This script safely drops and recreates all tables
-- Run this in Supabase SQL Editor if you need to start fresh

-- Drop all tables in reverse dependency order
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS po_line_items CASCADE;
DROP TABLE IF EXISTS purchase_orders CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS estimate_line_items CASCADE;
DROP TABLE IF EXISTS estimates CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS property_infos CASCADE;
DROP TABLE IF EXISTS unit_costs CASCADE;
DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop types
DO $$ BEGIN
  DROP TYPE IF EXISTS user_role CASCADE;
  DROP TYPE IF EXISTS project_status CASCADE;
  DROP TYPE IF EXISTS spec_package_type CASCADE;
  DROP TYPE IF EXISTS po_status CASCADE;
  DROP TYPE IF EXISTS photo_category CASCADE;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Drop function
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- Now copy and paste the ENTIRE contents of schema.sql below this line
-- (After running this, run seed-unit-costs.sql)
