import { useState } from 'react'
import { type Product } from '../types/product'

function useStates() {
    const [products, setProducts] = useState<Product[]>([])

    return { products, setProducts }
}

export { useStates }