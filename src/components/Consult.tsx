import Button from 'react-bootstrap/Button'
import { type Dispatch, type SetStateAction } from 'react'
import { type Product } from '../types/product'

interface Props {
    readonly setProducts: Dispatch<SetStateAction<Product[]>>
}

function Consult({ setProducts }: Props) {
    const handleClick = () => {
        const API = 'https://fakestoreapi.com/products'
        fetch(API)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => { throw new Error(error) })
    }

    return <Button onClick={handleClick}>Consult</Button>
}

export { Consult }