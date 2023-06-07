import {Plus, Minus, Trash} from 'phosphor-react'
import styles from './styles.module.scss'
import { useShoppingCart } from '../../../../hooks/shoppingCart'

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    tags: [string]
    quantity: number
}

interface CoffeeDisplayProps {
    product: Product
}

export default function CoffeeDisplay({product}: CoffeeDisplayProps) {
    const {removeProductFromShoppingCart, changeProductQuantityInShoppingCart} = useShoppingCart()
    
    function handleRemoveProductFromShoppingCart() {
        removeProductFromShoppingCart(product.id)
    }
    
    function handleIncreaseProductQuantityInShoppingCart() {
        changeProductQuantityInShoppingCart(product.id, 'increase')
    }
    
    function handleDecreaseProductQuantityInShoppingCart() {
        changeProductQuantityInShoppingCart(product.id, 'decrease')
    }
    
    return (
        <li className={styles.coffeeDisplay}>
            <figure>
                <img 
                src={product.imageUrl} 
                alt={`Imagem demonstrativa do ${product.name}`} />
            </figure>
            
            <div className={styles.info}>
                <span className={styles.productName}>
                    {product.name}
                </span>
                <span className={styles.price}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(product.price * product.quantity)}
                </span>
            </div>
            
            <div className={styles.actions}>
                <div className={styles.addOrRemoveFromCart}>
                    <button
                        type="button"
                        title="Remover 1 quantidade do produto ao carrinho"
                        onClick={handleDecreaseProductQuantityInShoppingCart}>
                        
                        <Minus weight="bold" />
                    </button>
                    
                    <span>{product.quantity}</span>
                    
                    <button
                        type="button"
                        title="Adicionar 1 quantidade do produto ao carrinho"
                        onClick={handleIncreaseProductQuantityInShoppingCart}>
                        
                        <Plus weight="bold" />
                    </button>
                </div>
                
                <button
                    type="button"
                    className={styles.deleteProduct}
                    onClick={handleRemoveProductFromShoppingCart}>
                    <Trash weight="fill" size={16} />
                    Remover
                </button>
            </div>
        </li>
    )
}