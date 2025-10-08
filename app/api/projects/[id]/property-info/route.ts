import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/projects/[id]/property-info
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

    const { data: propertyInfo, error } = await supabase
      .from('property_infos')
      .select('*, rooms(*), photos(*)')
      .eq('project_id', id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching property info:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ propertyInfo: propertyInfo || null })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/projects/[id]/property-info - Create or update property info
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
    const { rooms, ...propertyData } = body

    // Check if property info already exists
    const { data: existing } = await supabase
      .from('property_infos')
      .select('id')
      .eq('project_id', id)
      .single()

    let propertyInfo

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('property_infos')
        .update(propertyData)
        .eq('id', existing.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating property info:', error)
        return NextResponse.json({
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        }, { status: 500 })
      }
      propertyInfo = data
    } else {
      // Create new
      const { data, error } = await supabase
        .from('property_infos')
        .insert({ ...propertyData, project_id: id })
        .select()
        .single()

      if (error) {
        console.error('Error creating property info:', error)
        console.error('Property data:', JSON.stringify(propertyData, null, 2))
        return NextResponse.json({
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        }, { status: 500 })
      }
      propertyInfo = data
    }

    // Handle rooms if provided
    if (rooms && Array.isArray(rooms)) {
      // Delete existing rooms
      await supabase
        .from('rooms')
        .delete()
        .eq('property_info_id', propertyInfo.id)

      // Insert new rooms
      if (rooms.length > 0) {
        const roomsToInsert = rooms.map((room: any) => ({
          property_info_id: propertyInfo.id,
          name: room.name,
          length: room.length || 0,
          width: room.width || 0,
          misc_sf: room.miscSf || 0,
          misc_note: room.miscNote || ''
        }))

        const { error: roomError } = await supabase
          .from('rooms')
          .insert(roomsToInsert)

        if (roomError) {
          console.error('Error inserting rooms:', roomError)
          console.error('Rooms data:', JSON.stringify(roomsToInsert, null, 2))
          return NextResponse.json({
            error: roomError.message,
            details: roomError.details,
            hint: roomError.hint,
            code: roomError.code
          }, { status: 500 })
        }
      }
    }

    // Fetch complete data
    const { data: completeData } = await supabase
      .from('property_infos')
      .select('*, rooms(*)')
      .eq('id', propertyInfo.id)
      .single()

    return NextResponse.json({ propertyInfo: completeData })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
