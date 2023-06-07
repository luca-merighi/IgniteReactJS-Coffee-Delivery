import {useState} from 'react'
import { useShoppingCart } from '../../hooks/shoppingCart'

import {Plus, Minus, ShoppingCart} from 'phosphor-react'
import styles from './styles.module.scss'

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    tags: [string]
}

interface CoffeeCardProps {
    product: Product
}

export default function CoffeeCard({product}: CoffeeCardProps) {
    const {addProductToShoppingCart} = useShoppingCart()
    const [quantity, setQuantity] = useState(1)
    
    function handleIncreaseProductQuantity() {
        setQuantity(state => state + 1)
    }
    
    function handleDecreaseProductQuantity() {
        setQuantity(state => state - 1)
    }
    
    function handleAddProductToShoppingCart() {
        const productData = {
            ...product,
            quantity
        }
        addProductToShoppingCart(productData)
    }
    
    return (
        <li className={styles.coffeeCard}>
            <figure>
                <img 
                src={product.imageUrl} 
                alt={`Imagem demonstrativa do ${product.name}`} />
            </figure>
            
            <div className={styles.tags}>
                {product.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>
            
            <div className={styles.info}>
                <h3>
                    {product.name}
                </h3>
                
                <p>
                    {product.description}
                </p>
            </div>
            
            <footer>
                <span className={styles.price}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(product.price)}
                </span>
                
                <div className={styles.actions}>
                    <div className={styles.addOrRemoveFromCart}>
                        <button
                            type="button"
                            title="Remover 1 quantidade do produto ao carrinho"
                            onClick={handleDecreaseProductQuantity}
                            disabled={quantity <= 1}>
                            <Minus weight="bold" />
                        </button>
                        
                        <span>{quantity}</span>
                        
                        <button
                            type="button"
                            title="Adicionar 1 quantidade do produto ao carrinho"
                            onClick={handleIncreaseProductQuantity}>
                            <Plus weight="bold" />
                        </button>
                    </div>
                    
                    <button
                        title="Adicionar produto ao carrinho de compras"
                        onClick={handleAddProductToShoppingCart}
                        className={styles.addProductToShoppingCart}>
                        <ShoppingCart weight="fill" size={16} />
                    </button>
                </div>
            </footer>
        </li>
    )
}