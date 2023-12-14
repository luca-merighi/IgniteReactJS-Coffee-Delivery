import { useContext } from 'react'
import { CoffeeInShoppingCart, ShoppingCartContext } from '@/contexts/ShoppingCart'
import Image from 'next/image'

import { Minus, Plus, Trash } from 'phosphor-react'
import styles from './styles.module.scss'

interface CoffeeCard {
    coffee: CoffeeInShoppingCart
}

export default function CoffeeCard({ coffee }: CoffeeCard) {
    const { removeCoffeeFromShoppingCart, changeCoffeeQuantityInShoppingCart } = useContext(ShoppingCartContext)
    
    function handleIncreaseCoffeeQuantity() {
        changeCoffeeQuantityInShoppingCart(coffee.id, 'increase')
    }
    
    function handleDecreaseCoffeeQuantity() {
        changeCoffeeQuantityInShoppingCart(coffee.id, 'decrease')
    }
    
    function handleRemoveCoffeeFromShoppingCart() {
        removeCoffeeFromShoppingCart(coffee.id)
    }
    
    return (
        <li className={styles.coffeeCard}>
            <figure className={styles.imageContainer}>
                <Image
                    src={coffee.imageUrl} alt={`Imagem demonstrativa do ${coffee.name}`}
                    width={64} height={64} />
            </figure>
            
            <div className={styles.info}>
                <span>{coffee.name}</span>
                <span>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(coffee.price * coffee.quantity)}</span>
            </div>
            
            <div className={styles.actions}>
                <div className={styles.addOrRemoveProductFromCart}>
                    <button 
                        type="button"
                        title="Remover 1 quantidade do produto ao carrinho"
                        disabled={coffee.quantity === 1}
                        onClick={handleDecreaseCoffeeQuantity}>
                        <Minus weight="bold" />
                    </button>
                    
                    <span>
                        {coffee.quantity}
                    </span>
                    
                    <button 
                        type="button"
                        title="Adicionar 1 quantidade do produto ao carrinho"
                        onClick={handleIncreaseCoffeeQuantity}>
                        <Plus weight="bold" />
                    </button>
                </div>
                
                <button 
                    type="button"
                    className={styles.deleteProduct}
                    onClick={handleRemoveCoffeeFromShoppingCart}>
                    <Trash size={16} weight="fill" />
                    Remover
                </button>
            </div>
        </li>
    )
}