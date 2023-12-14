import { useContext } from 'react'
import { ShoppingCartContext } from '@/contexts/ShoppingCart'

import CoffeeCard from './CoffeeCard'

import styles from './styles.module.scss'

interface ShoppingCartProps {
    isFormSubmitting: boolean
}

export default function ShoppingCart({ isFormSubmitting }: ShoppingCartProps) {
    const { shoppingCart } = useContext(ShoppingCartContext)
    
    const delivery = 3.50
    const total = shoppingCart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.quantity
    }, 0)
    const totalValue = total + delivery
    
    return (
        <section className={styles.shoppingCart}>
            <h1>
                Cafés Selecionados
            </h1>
            
            <div className={styles.selectedCoffees}>
                <ul>
                    {shoppingCart.map(coffee => {
                        return (
                            <CoffeeCard
                                key={coffee.id}
                                coffee={coffee} />
                        )
                    })}
                </ul>
                
                <footer className={styles.summary}>
                    <div className={styles.totalInfo}>
                        <span>Total de itens</span>
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
                        <span>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(delivery)}
                        </span>
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
                    disabled={isFormSubmitting}>
                    Confirmar Pedido
                </button>
            </div>
        </section>
    )
}