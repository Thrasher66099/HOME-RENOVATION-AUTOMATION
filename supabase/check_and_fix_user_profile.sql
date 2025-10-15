-- Check your current user and profile
SELECT
  auth.uid() as user_id,
  auth.email() as email,
  p.role as current_role
FROM profiles p
WHERE p.id = auth.uid();

-- If the above returns no results or role is NULL, run this to create/update your profile:
-- Replace 'your-email@example.com' with your actual email

INSERT INTO profiles (id, email, role, created_at, updated_at)
SELECT
  id,
  email,
  'Admin',
  now(),
  now()
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id)
DO UPDATE SET
  role = 'Admin',
  updated_at = now();

-- Verify it worked
SELECT id, email, role FROM profiles WHERE id = auth.uid();
