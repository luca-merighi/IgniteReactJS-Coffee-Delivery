import { useContext, useState } from 'react'
import Image from 'next/image'
import { Coffee } from '@/contexts/Coffees'
import { ShoppingCartContext } from '@/contexts/ShoppingCart'

import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import styles from './styles.module.scss'

interface CoffeeCardProps {
    coffee: Coffee
}

export default function CoffeeCard({ coffee }: CoffeeCardProps) {
    const [coffeeQuantity, setCoffeeQuantity] = useState(0)
    const { addCoffeeToShoppingCart, changeCoffeeQuantityInShoppingCart } = useContext(ShoppingCartContext)
    
    function handleIncreaseCoffeeQuantity() {
        setCoffeeQuantity(state => state + 1)
        // changeCoffeeQuantityInShoppingCart(coffee.id, 'increase')
    }
    
    function handleDecreaseCoffeeQuantity() {
        setCoffeeQuantity(state => state - 1)
        // changeCoffeeQuantityInShoppingCart(coffee.id, 'increase')
    }
    
    function handleAddCoffeeToShoppingCart() {
        const coffeeData = {
            id: coffee.id,
            name: coffee.name,
            price: coffee.price,
            imageUrl: coffee.imageUrl,
            quantity: coffeeQuantity
        }
        addCoffeeToShoppingCart(coffeeData)
    }
    
    return (
        <li className={styles.coffeeCard}>
            <figure className={styles.imageContainer}>
                <Image
                    src={coffee.imageUrl} alt={`Imagem demonstrativa do ${coffee.name}`}
                    width={120} height={120} />
            </figure>
            
            <div className={styles.tags}>
                {coffee.tags.map(tag => {
                    return (
                        <span key={tag}>
                            {tag}
                        </span>
                    )
                })}
            </div>
            
            <div className={styles.info}>
                <h3>
                    {coffee.name}
                </h3>
                
                <p>
                    {coffee.description}
                </p>
            </div>
            
            <footer>
                <span className={styles.price}>
                    <strong>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(coffee.price)}
                    </strong>
                </span>
                
                <div className={styles.actions}>
                    <div className={styles.addOrRemoveProductFromCart}>
                        <button 
                            type="button"
                            title="Remover 1 quantidade do produto ao carrinho"
                            disabled={coffeeQuantity === 0}
                            onClick={handleDecreaseCoffeeQuantity}>
                            <Minus weight="bold" />
                        </button>
                        
                        <span>
                            {coffeeQuantity}
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
                        title="Adicionar quantidade do produto ao carrinho"
                        className={styles.addProductToCard}
                        disabled={coffeeQuantity === 0}
                        onClick={handleAddCoffeeToShoppingCart}>
                        <ShoppingCart size={16} weight="bold" />
                    </button>
                </div>
            </footer>
        </li>
    )
}