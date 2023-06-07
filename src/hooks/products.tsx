import {ReactNode, createContext, useContext, useState, useEffect} from 'react'
import api from '../services/api'

interface ProductsProviderProps {
    children: ReactNode
}

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    tags: [string]
}

interface ProductsContextData {
    products: Product[]
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData)

export default function ProductsProvider(props: ProductsProviderProps) {
    const [products, setProducts] = useState<Product[]>([])
    
    useEffect(() => {
        async function loadProductsList() {
            const getProductsList = await api.get('/products')
            setProducts(getProductsList.data)
        } 
        loadProductsList()
    }, [])
    
    return (
        <ProductsContext.Provider value={{
            products
        }}>
            {props.children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext)
    return context
}