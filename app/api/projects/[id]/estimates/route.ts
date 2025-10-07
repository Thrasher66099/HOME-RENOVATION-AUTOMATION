import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/projects/[id]/estimates - Get all estimates for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: estimates, error } = await supabase
      .from('estimates')
      .select('*, estimate_line_items(*)')
      .eq('project_id', id)
      .order('version', { ascending: false })

    if (error) {
      console.error('Error fetching estimates:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ estimates })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/projects/[id]/estimates - Create new estimate
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { line_items, ...estimateData } = body

    // Get the next version number
    const { data: existingEstimates } = await supabase
      .from('estimates')
      .select('version')
      .eq('project_id', id)
      .order('version', { ascending: false })
      .limit(1)

    const nextVersion = existingEstimates && existingEstimates.length > 0
      ? existingEstimates[0].version + 1
      : 1

    // Create estimate
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .insert({
        ...estimateData,
        project_id: id,
        version: nextVersion,
        created_by: user.id,
        valid_until: estimateData.valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })
      .select()
      .single()

    if (estimateError) {
      console.error('Error creating estimate:', estimateError)
      return NextResponse.json({ error: estimateError.message }, { status: 500 })
    }

    // Create line items if provided
    if (line_items && Array.isArray(line_items) && line_items.length > 0) {
      const lineItemsToInsert = line_items.map((item, index) => ({
        ...item,
        estimate_id: estimate.id,
        sort_order: item.sort_order !== undefined ? item.sort_order : index
      }))

      const { error: lineItemsError } = await supabase
        .from('estimate_line_items')
        .insert(lineItemsToInsert)

      if (lineItemsError) {
        console.error('Error creating line items:', lineItemsError)
        // We could rollback here, but for now we'll just log it
      }
    }

    // Fetch complete estimate with line items
    const { data: completeEstimate } = await supabase
      .from('estimates')
      .select('*, estimate_line_items(*)')
      .eq('id', estimate.id)
      .single()

    return NextResponse.json({ estimate: completeEstimate }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
