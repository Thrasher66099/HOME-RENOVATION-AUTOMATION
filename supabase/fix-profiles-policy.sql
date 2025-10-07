-- Fix the infinite recursion in profiles policies
-- Run this in Supabase SQL Editor

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Add a simple insert policy instead
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Verify policies
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'profiles';
