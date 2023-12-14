import { createContext, ReactNode, useEffect, useState } from 'react'
import { produce } from 'immer'
import { Order } from '@/pages/checkout/index.page'

interface ShoppingCartProviderProps {
    children: ReactNode
}

export interface CoffeeInShoppingCart {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
}

interface ShoppingCartData {
    shoppingCart: CoffeeInShoppingCart[],
    addCoffeeToShoppingCart: (coffee: CoffeeInShoppingCart) => void,
    removeCoffeeFromShoppingCart: (id: number) => void,
    changeCoffeeQuantityInShoppingCart: (
        coffeeId: number, type: 'increase' | 'decrease') => void,
    cleanShoppingCart: () => void,
    order: Order | null,
    handleCompletedOrder: (order: Order) => void
}

export const ShoppingCartContext = createContext<ShoppingCartData>({} as ShoppingCartData)

const ShoppingCartStorageKey = '@ignite:coffeeDeliveryShoppingCart'
const OrderStorageKey = '@ignite:coffeeDeliveryOrder'

export default function ShoppingCartProvider(props: ShoppingCartProviderProps) {
    const [shoppingCart, setShoppingCart] = useState<CoffeeInShoppingCart[]>([])
    const [order, setOrder] = useState<Order | null>(null)
    
    function handleStoragedShoppingCart(coffee: CoffeeInShoppingCart[]) {
        localStorage.setItem(ShoppingCartStorageKey, JSON.stringify(coffee))
    }
    
    function handleStoragedOrder(order: Order) {
        localStorage.setItem(OrderStorageKey, JSON.stringify(order))
    }
    
    function addCoffeeToShoppingCart(coffee: CoffeeInShoppingCart) {
        const coffeeAlreadyExistsInShoppingCart = shoppingCart.findIndex(
            (currentCoffee) => currentCoffee.id === coffee.id)
        const newShoppingCart = produce(shoppingCart, (draft) => {
            if(coffeeAlreadyExistsInShoppingCart < 0) {
                draft.push(coffee)
            } else {
                draft[coffeeAlreadyExistsInShoppingCart].quantity += coffee.quantity
            }
        })
        setShoppingCart(newShoppingCart)
        handleStoragedShoppingCart(newShoppingCart)
    }
    
    function removeCoffeeFromShoppingCart(id: number) {
        const newShoppingCart = shoppingCart.filter(
            (currentCoffee) => currentCoffee.id !== id)
        setShoppingCart(newShoppingCart)
        handleStoragedShoppingCart(newShoppingCart)
    }
    
    function handleCompletedOrder(order: Order) {
        handleStoragedOrder(order)
        setOrder(order)
    }
    
    function cleanShoppingCart() {
        setShoppingCart([])
    }
    
    function changeCoffeeQuantityInShoppingCart(
        coffeeId: number, type: 'increase' | 'decrease') {
        const newShoppingCart = produce(shoppingCart, (draft) => {
            const CoffeeAlreadyExistsInShoppingCart = shoppingCart.findIndex(
                currentCoffee => currentCoffee.id === coffeeId
            )
            const coffee = draft[CoffeeAlreadyExistsInShoppingCart]
            
            if(CoffeeAlreadyExistsInShoppingCart >= 0) {
                draft[CoffeeAlreadyExistsInShoppingCart].quantity = 
                    type === 'increase' ? coffee.quantity + 1 : coffee.quantity - 1
            }
        })
        handleStoragedShoppingCart(newShoppingCart)
        setShoppingCart(newShoppingCart)
    }
    
    useEffect(() => {
        const storedShoppingCart = localStorage.getItem(ShoppingCartStorageKey)
        if(storedShoppingCart) {
            setShoppingCart(JSON.parse(storedShoppingCart))
        }
        
        const storedOrder = localStorage.getItem(OrderStorageKey)
        if(storedOrder) {
            setOrder(JSON.parse(storedOrder))
        }
    }, [])
    
    return (
        <ShoppingCartContext.Provider value={{
            shoppingCart,
            addCoffeeToShoppingCart,
            removeCoffeeFromShoppingCart,
            changeCoffeeQuantityInShoppingCart,
            cleanShoppingCart,
            order,
            handleCompletedOrder
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}