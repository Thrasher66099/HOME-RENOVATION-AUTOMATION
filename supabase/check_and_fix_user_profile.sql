-- Check your current user and profile
SELECT
  auth.uid() as user_id,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as email,
  p.role as current_role,
  p.created_at
FROM profiles p
WHERE p.id = auth.uid();

-- If the above returns no results, your profile doesn't exist
-- If role is NULL or you need to change it, run this:

-- Create or update your profile to Admin role
INSERT INTO profiles (id, role, created_at)
VALUES (auth.uid(), 'Admin', NOW())
ON CONFLICT (id)
DO UPDATE SET
  role = 'Admin';

-- Verify it worked
SELECT
  auth.uid() as user_id,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as email,
  p.role as current_role
FROM profiles p
WHERE p.id = auth.uid();
