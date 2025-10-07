import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/estimates/[id] - Get estimate details
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

    const { data: estimate, error } = await supabase
      .from('estimates')
      .select('*, estimate_line_items(*), projects(*)')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching estimate:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ estimate })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/estimates/[id] - Update estimate
export async function PUT(
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

    // Update estimate
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .update(estimateData)
      .eq('id', id)
      .select()
      .single()

    if (estimateError) {
      console.error('Error updating estimate:', estimateError)
      return NextResponse.json({ error: estimateError.message }, { status: 500 })
    }

    // If line items are provided, replace them
    if (line_items !== undefined) {
      // Delete existing line items
      await supabase
        .from('estimate_line_items')
        .delete()
        .eq('estimate_id', id)

      // Insert new line items
      if (Array.isArray(line_items) && line_items.length > 0) {
        const lineItemsToInsert = line_items.map((item, index) => ({
          ...item,
          estimate_id: id,
          sort_order: item.sort_order !== undefined ? item.sort_order : index
        }))

        await supabase
          .from('estimate_line_items')
          .insert(lineItemsToInsert)
      }
    }

    // Fetch complete estimate
    const { data: completeEstimate } = await supabase
      .from('estimates')
      .select('*, estimate_line_items(*)')
      .eq('id', id)
      .single()

    return NextResponse.json({ estimate: completeEstimate })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/estimates/[id] - Delete estimate
export async function DELETE(
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

    const { error } = await supabase
      .from('estimates')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting estimate:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
