import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/unit-costs - List unit costs with search/filter
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const isActive = searchParams.get('is_active')

    let query = supabase
      .from('unit_costs')
      .select('*')
      .order('category', { ascending: true })
      .order('action_item', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(`action_item.ilike.%${search}%,description.ilike.%${search}%,sku.ilike.%${search}%`)
    }

    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true')
    }

    const { data: unitCosts, error } = await query

    if (error) {
      console.error('Error fetching unit costs:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ unitCosts })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/unit-costs - Create new unit cost
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const { data: unitCost, error } = await supabase
      .from('unit_costs')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Error creating unit cost:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ unitCost }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
