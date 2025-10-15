-- First, find your user ID
-- Run this to see all users in the system
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Copy your user ID from the results above
-- Then run this, replacing 'YOUR-USER-ID-HERE' with your actual UUID:

INSERT INTO profiles (id, role, created_at)
VALUES ('YOUR-USER-ID-HERE', 'Admin', NOW())
ON CONFLICT (id)
DO UPDATE SET role = 'Admin';

-- Verify it worked (replace YOUR-USER-ID-HERE again)
SELECT * FROM profiles WHERE id = 'YOUR-USER-ID-HERE';

-- Alternative: Set ALL existing users to Admin role
-- (Only use this if you want all users to have Admin access)
INSERT INTO profiles (id, role, created_at)
SELECT id, 'Admin', NOW()
FROM auth.users
ON CONFLICT (id)
DO UPDATE SET role = 'Admin';

-- Verify all profiles
SELECT
  p.id,
  u.email,
  p.role,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id;
