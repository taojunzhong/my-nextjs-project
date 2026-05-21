import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log('[DEBUG] Video upload request received')
    
    const backendUrl = 'http://localhost:8081/api/upload/video'
    
    const formData = await request.formData()
    console.log('[DEBUG] FormData keys:', Array.from(formData.keys()))
    
    const file = formData.get('file')
    const prisonId = formData.get('prisonId')
    console.log('[DEBUG] File:', file ? file.name : 'null')
    console.log('[DEBUG] PrisonId:', prisonId)
    
    const backendFormData = new FormData()
    if (file) {
      backendFormData.append('file', file as File)
    }
    if (prisonId) {
      backendFormData.append('prisonId', prisonId as string)
    }
    
    console.log('[DEBUG] Forwarding to backend:', backendUrl)
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: backendFormData,
    })
    
    console.log('[DEBUG] Backend response status:', response.status)
    console.log('[DEBUG] Backend response headers:', Object.fromEntries(response.headers))
    
    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json()
        console.log('[DEBUG] Backend response data:', data)
      } catch (parseError) {
        console.error('[ERROR] Failed to parse JSON:', parseError)
        const text = await response.text()
        console.log('[DEBUG] Response text:', text)
        data = { code: response.status, message: text || 'Unknown error' }
      }
    } else {
      const text = await response.text()
      console.log('[DEBUG] Response text (non-JSON):', text)
      data = { code: response.status, message: text || 'Unknown error' }
    }
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[ERROR] Error forwarding video upload:', error)
    if (error instanceof Error) {
      console.error('[ERROR] Error message:', error.message)
      console.error('[ERROR] Error stack:', error.stack)
    }
    return NextResponse.json({ code: 500, message: 'Failed to upload video' }, { status: 500 })
  }
}