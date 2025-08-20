import { NextRequest, NextResponse } from 'next/server'
import { generateEnhancedBreadcrumbs } from '@/lib/breadcrumbs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pathname = searchParams.get('pathname')
  
  if (!pathname) {
    return NextResponse.json({ error: 'Missing pathname parameter' }, { status: 400 })
  }
  
  try {
    const breadcrumbs = generateEnhancedBreadcrumbs(pathname)
    return NextResponse.json({ breadcrumbs })
  } catch (error) {
    console.error('Error generating breadcrumbs:', error)
    return NextResponse.json({ error: 'Failed to generate breadcrumbs' }, { status: 500 })
  }
}