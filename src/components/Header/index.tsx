import {NavLink} from 'react-router-dom'
import { useShoppingCart } from '../../hooks/shoppingCart'

import {MapPin, ShoppingCart} from 'phosphor-react'
import logoImg from '/logo.svg'
import styles from './styles.module.scss'

export default function Header() {
    const {shoppingCart} = useShoppingCart()
    
    const cartProductsLength = () => {
        if(shoppingCart.length >= 9) {
            return (
                <div className={styles.cartProductsLength}>
                    +9
                </div>
            )
        } else if(shoppingCart.length <= 9 && shoppingCart.length !== 0) {
            return (
                <div className={styles.cartProductsLength}>
                    {shoppingCart.length}
                </div>
            )
        } else if(shoppingCart.length === 0) {
            return false
        }
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/">
                <img 
                src={logoImg} 
                alt="Logo Coffee Delivery" />
                </NavLink>
                
                <nav>
                    <button
                        type="button">
                        <MapPin size={20} weight="fill" />
                        Campinas, SP
                    </button>
                    
                    <NavLink
                        to="/checkout"
                        type="button"
                        title="Abrir carrinho"
                        className={styles.checkoutLink}>
                        <ShoppingCart size={20} weight="fill" />
                        {cartProductsLength()}
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}