const BASE_URL = 'http://localhost:3000/api'

// ─── helpers ─────────────────────────────────────────────────────────────────

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    throw new Error(msg || `Request failed: ${res.status}`)
  }

  return res.json()
}

// ─── pages ───────────────────────────────────────────────────────────────────

export function getPages() {
  return request('/admin/pages')
}

export function getPage(id) {
  return request(`/admin/pages/${id}`)
}

export function createPage(payload) {
  return request('/admin/pages', {
    method: 'POST',
    body:   JSON.stringify(payload)
  })
}

export function updatePage(id, payload) {
  return request(`/admin/pages/${id}`, {
    method: 'PUT',
    body:   JSON.stringify(payload)
  })
}

export function updatePageContent(id, content) {
  return request(`/admin/pages/${id}/content`, {
    method: 'PUT',
    body:   JSON.stringify(content)
  })
}

// ─── images ──────────────────────────────────────────────────────────────────

export async function uploadImage(file) {
  const form = new FormData()
  form.append('file', file)

  const res = await fetch(`${BASE_URL}/admin/upload`, {
    method: 'POST',
    body:   form
  })

  if (!res.ok) throw new Error('Upload mislukt')

  const data = await res.json()
  return data.url
}

// ─── navbar ──────────────────────────────────────────────────────────────────

export function getNavbar() {
  return request('/admin/navbar')
}

export function createNavItem(payload) {
  return request('/admin/navbar', {
    method: 'POST',
    body:   JSON.stringify(payload)
  })
}

export function updateNavItem(id, payload) {
  return request(`/admin/navbar/${id}`, {
    method: 'PUT',
    body:   JSON.stringify(payload)
  })
}
