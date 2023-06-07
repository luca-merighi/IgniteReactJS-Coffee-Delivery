import {ReactNode, createContext, useState, useContext, useEffect} from 'react'
import {produce} from 'immer'

interface ShoppingCartProviderProps {
    children: ReactNode
}

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    tags: [string],
}

interface ProductInShoppingCart extends Product {
    quantity: number
}

interface ShoppingCartContextData {
    shoppingCart: ProductInShoppingCart[],
    addProductToShoppingCart: (product: ProductInShoppingCart) => void,
    changeProductQuantityInShoppingCart: (
        productID: number, type: 'increase' | 'decrease') => void,
    removeProductFromShoppingCart: (productId: number) => void,
    clearShoppingCart: () => void
}

const ShoppingCartContext = createContext<ShoppingCartContextData>({} as ShoppingCartContextData)

export default function ShoppingCart(props: ShoppingCartProviderProps) {
    const [shoppingCart, setShoppingCart] = useState<ProductInShoppingCart[]>(
        () => {
            const shoppingCartInLocalStorage = localStorage.getItem(
                'coffee-delivery-shopping-cart'
            )
            if(shoppingCartInLocalStorage) {
                return JSON.parse(shoppingCartInLocalStorage)
            }
            return []
        }
    )
    
    function addProductToShoppingCart(product: ProductInShoppingCart) {
        const productAlreadyExistsInShoppingCart = shoppingCart.findIndex(
            (currentProduct) => currentProduct.id === product.id
        )
        const newShoppingCart = produce(shoppingCart, (draft) => {
            if(productAlreadyExistsInShoppingCart < 0) {
                draft.push(product)
            } else {
                draft[productAlreadyExistsInShoppingCart].quantity += product.quantity
            }
        })
        setShoppingCart(newShoppingCart)
    }
    
    function changeProductQuantityInShoppingCart(
        productId: number, type: 'increase' | 'decrease') {
        const newShoppingCart = produce(shoppingCart, (draft) => {
            const productAlreadyExistsInShoppingCart = shoppingCart.findIndex(
                currentProduct => currentProduct.id === productId
            )
            if(productAlreadyExistsInShoppingCart >= 0) {
                const item = draft[productAlreadyExistsInShoppingCart]
                draft[productAlreadyExistsInShoppingCart].quantity = 
                    type === 'increase' ? item.quantity + 1 : item.quantity - 1
                if(item.quantity === 0) {
                    removeProductFromShoppingCart(item.id)
                }
            }
        })
        setShoppingCart(newShoppingCart)
    }
    
    function removeProductFromShoppingCart(productId: number) {
        const newShoppingCart = shoppingCart.filter(
            currentProduct => currentProduct.id !== productId
        )
        setShoppingCart(newShoppingCart)
    }
    
    function clearShoppingCart() {
        setShoppingCart([])
    }
    
    useEffect(() => {
        localStorage.setItem('coffee-delivery-shopping-cart', JSON.stringify(shoppingCart))
    }, [shoppingCart])
       
    return (
        <ShoppingCartContext.Provider value={{
            shoppingCart,
            addProductToShoppingCart,
            changeProductQuantityInShoppingCart,
            removeProductFromShoppingCart,
            clearShoppingCart
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    const context = useContext(ShoppingCartContext)
    return context
}