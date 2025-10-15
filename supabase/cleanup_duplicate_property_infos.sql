-- Check for duplicate property_infos (same project_id)
-- Run this first to see if you have duplicates

SELECT project_id, COUNT(*) as count
FROM property_infos
GROUP BY project_id
HAVING COUNT(*) > 1;

-- If you have duplicates, this will keep only the most recent one
-- BACKUP YOUR DATA BEFORE RUNNING THIS!

-- Create a temporary table with the IDs to keep (most recent for each project)
CREATE TEMP TABLE property_infos_to_keep AS
SELECT DISTINCT ON (project_id) id
FROM property_infos
ORDER BY project_id, created_at DESC;

-- Delete all property_infos that are NOT in the keep list
-- Uncomment the line below to execute (after verifying the SELECT query above)
-- DELETE FROM property_infos WHERE id NOT IN (SELECT id FROM property_infos_to_keep);

-- Verify result
SELECT project_id, COUNT(*) as count
FROM property_infos
GROUP BY project_id;
