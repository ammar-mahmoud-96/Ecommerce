import { createSlice } from '@reduxjs/toolkit'

const productsList: Product[] = [
    { id: 1, title: 'T-shirt with Tape Details', description: 'Soft cotton tee', price: 120, image: '/assets/Products/product1.png', category: 'T-shirts', colors: ['green', 'yellow'], sizes: ['Small', 'Medium', 'Large'], dressStyle: 'Casual', isNew: true, isBestSeller: false, isOnSale: false },
    { id: 2, title: 'Skinny Fit Jeans', description: 'Slim fit', price: 240, image: '/assets/Products/product2.png', category: 'Jeans', colors: ['blue'], sizes: ['Medium', 'Large', 'X-Large'], dressStyle: 'Formal', isNew: true, isBestSeller: false, isOnSale: false },
    { id: 3, title: 'Checkered Shirt', description: 'Casual check shirt', price: 180, image: '/assets/Products/product3.png', category: 'Shirts', colors: ['red', 'blue'], sizes: ['Small', 'Medium', 'Large'], dressStyle: 'Party', isNew: true, isBestSeller: false, isOnSale: false },
    { id: 4, title: 'Sleeve Striped T-shirt', description: 'Striped tee', price: 130, image: '/assets/Products/product4.png', category: 'T-shirts', colors: ['orange', 'black'], sizes: ['Small', 'Medium', 'Large'], dressStyle: 'Gym', isNew: false, isBestSeller: true, isOnSale: true },
    { id: 5, title: 'VERTICAL STRIPED SHIRT', description: 'Striped tee', price: 130, image: '/assets/Products/product5.png', category: 'Shirts', colors: ['green'], sizes: ['Medium', 'Large'], dressStyle: 'Casual', isNew: false, isBestSeller: true, isOnSale: true },
    { id: 6, title: 'COURAGE GRAPHIC T-SHIRT', description: 'Graphic tee', price: 130, image: '/assets/Products/product6.png', category: 'T-shirts', colors: ['orange'], sizes: ['Small', 'Medium', 'Large'], dressStyle: 'Gym', isNew: false, isBestSeller: true, isOnSale: true },
    { id: 7, title: 'LOOSE FIT BERMUDA SHORTS', description: 'Loose fit shorts', price: 130, image: '/assets/Products/product7.png', category: 'Shorts', colors: ['blue'], sizes: ['Small', 'Medium', 'Large'], dressStyle: 'Casual', isNew: false, isBestSeller: true, isOnSale: true },
    { id: 8, title: 'FADED SKINNY JEANS', description: 'Faded jeans', price: 130, image: '/assets/Products/product8.png', category: 'Jeans', colors: ['blue'], sizes: ['Medium', 'Large'], dressStyle: 'Formal', isNew: false, isBestSeller: true, isOnSale: true },
    { id: 9, title: 'Polo with Contrast Trims', description: 'Polo shirt', price: 130, image: '/assets/Products/product9.png', category: 'Shirts', colors: ['red'], sizes: ['Small', 'Medium', 'Large'], dressStyle: 'Party', isNew: false, isBestSeller: true, isOnSale: true }

    ]
type Product = {
    id: number
    title: string
    description?: string
    price: number
    image?: string
    category: string
    colors: string[]
    sizes: string[]
    dressStyle: string
    isNew?: boolean
    isBestSeller?: boolean
    isOnSale?: boolean
}

const initialState: { items: Product[] } = {
    items: productsList
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.items = action.payload
        }
    }
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer
