type Category = 'electronics' | 'jewelery' | 'men\'s clothing' | 'women\'s clothing'

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: Category
    image: string
    rating: {
        rate: number,
        count: number
    }
}