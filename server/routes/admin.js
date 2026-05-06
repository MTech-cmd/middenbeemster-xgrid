const BASE_URL = 'http://localhost:3000/api'

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...getHeaders(), ...options.headers },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Server error: ${response.status}`)
  }
  return response.json()
}

// ── Pages ────────────────────────────────────────────────
export const getPages   = ()               => request('/admin/pages')
export const getPage    = (id)             => request(`/admin/pages/${id}`)
export const createPage = (data)           => request('/admin/pages', { method: 'POST', body: JSON.stringify(data) })
export const updatePage = (id, data)       => request(`/admin/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deletePage = (id)             => request(`/admin/pages/${id}`, { method: 'DELETE' })

// ── Content ──────────────────────────────────────────────
// content = { hero_title: 'Welkom', hero_image: '/uploads/abc.jpg', ... }
// De backend doet upsert per ApiName op basis van page_id
export const updatePageContent = (id, content) =>
  request(`/admin/pages/${id}/content`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
  })

// ── Image upload ─────────────────────────────────────────
export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`${BASE_URL}/admin/upload`, {
    method: 'POST',
    body: formData,
    // Geen Content-Type header: browser stelt multipart/form-data automatisch in
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Upload mislukt: ${response.status}`)
  }

  const data = await response.json()
  return data.url
}