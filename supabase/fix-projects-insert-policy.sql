-- Fix projects INSERT policy to avoid RLS issues
-- Run this in Supabase SQL Editor

-- Drop the problematic INSERT policy
DROP POLICY IF EXISTS "Authorized users can create projects" ON projects;

-- Create a simpler INSERT policy that allows authenticated users to create projects
CREATE POLICY "Authenticated users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Verify the policy
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'projects';
