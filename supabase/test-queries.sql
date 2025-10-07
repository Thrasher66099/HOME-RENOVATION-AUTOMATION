-- Test Queries to Diagnose Issues
-- Run these in Supabase SQL Editor to check your setup

-- 1. Check if your user has a profile
SELECT * FROM profiles;

-- 2. Check if projects table exists and is empty
SELECT * FROM projects;

-- 3. Test if you can insert a project manually
-- Get your user ID first:
SELECT id, email FROM auth.users;

-- Then try to insert a test project (replace YOUR_USER_ID_HERE with actual ID from above)
INSERT INTO projects (name, address, status, created_by)
VALUES (
  'Test Project',
  '{"street": "123 Main St", "city": "Test City", "state": "CA", "zip": "12345"}'::jsonb,
  'Draft',
  'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
)
RETURNING *;

-- 4. Check if RLS policies exist for projects
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'projects';

-- 5. Test if you can select from projects (should work after insert above)
SELECT * FROM projects;
