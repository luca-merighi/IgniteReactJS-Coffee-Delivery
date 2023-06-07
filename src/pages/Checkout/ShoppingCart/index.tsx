import { useShoppingCart } from '../../../hooks/shoppingCart'
import CoffeeDisplay from './CoffeeDisplay'

import styles from './styles.module.scss'

export default function ShoppingCart() {
    const {shoppingCart} = useShoppingCart()
    
    const delivery = 3.50
    const total = shoppingCart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.quantity
    }, 0)
    const totalValue = total + delivery
    
    return (
        <section className={styles.shoppingCart}>
            <h1>
                Cafés selecionados
            </h1>
            
            <div className={styles.selectedProducts}>
                <ul className={styles.productsList}>
                    {shoppingCart.map((product) => (
                        <CoffeeDisplay key={product.id} product={product} />
                    ))}
                </ul>
                
                <footer className={styles.summary}>
                    <div className={styles.totalInfo}>
                        <span>Total de Itens</span>
                        <span>Entrega</span>
                        <span>Total</span>
                    </div>
                    
                    <div className={styles.prices}>
                        <span>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(total)}
                        </span>
                        <span>R$ {delivery}</span>
                        <span>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(totalValue)}
                        </span>
                    </div>
                </footer>
                
                <button
                    type="submit"
                    className={styles.confirmButton}>
                    Confirmar Pedido
                </button>
            </div>
        </section>
    )
}