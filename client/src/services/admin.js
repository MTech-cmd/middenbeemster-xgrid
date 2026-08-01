const BASE_URL = 'http://localhost:3000/api'
const ASSET_BASE_URL = 'http://localhost:3000'

function getAuthHeaders() {
    const token = localStorage.getItem('token')

    return token
        ? { Authorization: `Bearer ${token}` }
        : {}
}

async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...options.headers,
        },
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || `Server error: ${response.status}`)
    }

    return response.json()
}

// ── Pages ────────────────────────────────────────────────
export const getPages = (website) => request(`/admin/pages${website ? `?website=${encodeURIComponent(website)}` : ''}`)
export const getPage = (id) => request(`/admin/pages/${id}`)
export const createPage = (data) => request('/admin/pages', { method: 'POST', body: JSON.stringify(data) })
export const updatePage = (id, data) => request(`/admin/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deletePage = (id) => request(`/admin/pages/${id}`, { method: 'DELETE' })

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
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || `Upload mislukt: ${response.status}`)
    }

    const data = await response.json()
    return new URL(data.url, ASSET_BASE_URL).href
}

// ── Navbar ───────────────────────────────────────────────
export const getNavbar = () => request('/admin/navbar')
export const saveNavbar = (data) => request('/admin/navbar', { method: 'PUT', body: JSON.stringify(data) })

export function resolveUploadUrl(raw) {
    if (!raw) return ''
    try {
        const s = String(raw)
        if (s.startsWith('http://') || s.startsWith('https://')) return s
        if (s.startsWith('/uploads')) return new URL(s, ASSET_BASE_URL).href
        return s
    } catch (e) {
        return raw
    }
}
