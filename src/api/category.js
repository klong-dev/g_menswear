export const fetchCategories = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`)
        const data = await response.json()
        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        const data = await response.json()
        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}