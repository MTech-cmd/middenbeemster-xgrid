const BASE_URL = 'http://localhost:3000/api'

// ======================================
// PAGINA'S
// ======================================

export async function getPages() {

    const response = await fetch(
        `${BASE_URL}/admin/pages`
    )

    if (!response.ok) {
        throw new Error('Kon pagina\'s niet laden')
    }

    return await response.json()

}

export async function getPage(id) {

    const response = await fetch(
        `${BASE_URL}/admin/pages/${id}`
    )

    if (!response.ok) {
        throw new Error('Kon pagina niet laden')
    }

    return await response.json()

}

export async function createPage(data) {

    const response = await fetch(
        `${BASE_URL}/admin/pages`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        throw new Error('Pagina aanmaken mislukt')
    }

    return await response.json()

}

export async function updatePage(id, data) {

    const response = await fetch(
        `${BASE_URL}/admin/pages/${id}`,
        {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        throw new Error('Pagina bijwerken mislukt')
    }

    return await response.json()

}

export async function deletePage(id) {

    const response = await fetch(
        `${BASE_URL}/admin/pages/${id}`,
        {
            method: 'DELETE'
        }
    )

    if (!response.ok) {
        throw new Error('Pagina verwijderen mislukt')
    }

    return true

}

// ======================================
// CONTENT
// ======================================

export async function updatePageContent(
    pageId,
    content
) {

    const response = await fetch(
        `${BASE_URL}/admin/pages/${pageId}/content`,
        {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(content)
        }
    )

    if (!response.ok) {
        throw new Error('Content opslaan mislukt')
    }

    return await response.json()

}

// ======================================
// IMAGE UPLOAD
// ======================================

export async function uploadImage(file) {

    const formData = new FormData()

    formData.append(
        'image',
        file
    )

    const response = await fetch(
        `${BASE_URL}/upload`,
        {
            method: 'POST',
            body: formData
        }
    )

    if (!response.ok) {
        throw new Error('Upload mislukt')
    }

    const data = await response.json()

    return data.url

}

// ======================================
// NAVBAR
// ======================================

export async function getNavbar() {

    const response = await fetch(
        `${BASE_URL}/admin/navbar`
    )

    if (!response.ok) {
        throw new Error('Navbar laden mislukt')
    }

    return await response.json()

}

export async function createNavbarItem(data) {

    const response = await fetch(
        `${BASE_URL}/admin/navbar`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        throw new Error('Navbar item maken mislukt')
    }

    return await response.json()

}

export async function updateNavbarItem(
    id,
    data
) {

    const response = await fetch(
        `${BASE_URL}/admin/navbar/${id}`,
        {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        throw new Error('Navbar item bijwerken mislukt')
    }

    return await response.json()

}

export async function deleteNavbarItem(id) {

    const response = await fetch(
        `${BASE_URL}/admin/navbar/${id}`,
        {
            method: 'DELETE'
        }
    )

    if (!response.ok) {
        throw new Error('Navbar item verwijderen mislukt')
    }

    return true

}
