-- Fix RLS policies for property_infos and rooms tables
-- Run this SQL in your Supabase SQL Editor to allow INSERT/UPDATE/DELETE operations

-- Add INSERT policy for property_infos
CREATE POLICY "Authorized users can create property info" ON property_infos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects WHERE id = property_infos.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Estimator'))
      )
    )
  );

-- Add UPDATE policy for property_infos
CREATE POLICY "Authorized users can update property info" ON property_infos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects WHERE id = property_infos.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Add DELETE policy for property_infos
CREATE POLICY "Authorized users can delete property info" ON property_infos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects WHERE id = property_infos.project_id AND (
        created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Add INSERT policy for rooms
CREATE POLICY "Authorized users can create rooms" ON rooms
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM property_infos pi
      JOIN projects p ON pi.project_id = p.id
      WHERE pi.id = rooms.property_info_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Estimator'))
      )
    )
  );

-- Add UPDATE policy for rooms
CREATE POLICY "Authorized users can update rooms" ON rooms
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM property_infos pi
      JOIN projects p ON pi.project_id = p.id
      WHERE pi.id = rooms.property_info_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );

-- Add DELETE policy for rooms
CREATE POLICY "Authorized users can delete rooms" ON rooms
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM property_infos pi
      JOIN projects p ON pi.project_id = p.id
      WHERE pi.id = rooms.property_info_id AND (
        p.created_by = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Manager'))
      )
    )
  );
