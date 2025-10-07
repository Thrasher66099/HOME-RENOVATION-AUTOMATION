# Supabase Database Setup

## Step 1: Run the Main Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Click "New query"
5. Copy and paste the **entire contents** of `supabase/schema.sql`
6. Click "Run" (or press Ctrl+Enter)
7. Wait for it to complete (should see "Success" message)

## Step 2: Seed Unit Costs Data

1. In the SQL Editor, create another "New query"
2. Copy and paste the **entire contents** of `supabase/seed-unit-costs.sql`
3. Click "Run"
4. Wait for completion

## Step 3: Verify Tables Exist

Run this query to check if tables were created:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see tables like:
- profiles
- projects
- property_infos
- rooms
- regions
- unit_costs
- estimates
- estimate_line_items
- vendors
- purchase_orders
- po_line_items
- material_expenses
- photos
- activity_log

## Step 4: Check RLS Policies

```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

You should see RLS policies for all tables.

## Step 5: Test Project Creation

Try creating a project manually to test:

```sql
-- First, get your user ID
SELECT id, email FROM auth.users;

-- Then create a test project (replace YOUR_USER_ID with actual ID)
INSERT INTO projects (name, address, status, created_by)
VALUES (
  'Test Project',
  '{"street": "123 Main St", "city": "Anytown", "state": "CA", "zip": "12345"}',
  'Draft',
  'YOUR_USER_ID'
)
RETURNING *;
```

## Troubleshooting

### Error: "relation 'projects' does not exist"
- You need to run `supabase/schema.sql` first

### Error: "permission denied for table projects"
- Check that RLS policies are enabled
- Make sure you're logged in with the correct user

### Error: "new row violates row-level security policy"
- Check that the `profiles` table has a row for your user
- The trigger should create this automatically on signup
- If not, manually insert: `INSERT INTO profiles (id) VALUES ('YOUR_USER_ID');`
