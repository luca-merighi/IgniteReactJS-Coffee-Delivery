import { useContext } from 'react'
import { ShoppingCartContext } from '@/contexts/ShoppingCart'
import Link from 'next/link'
import Image from 'next/image'

import { MapPin, ShoppingCart } from 'phosphor-react'
import styles from './styles.module.scss'

export default function Header() {
    const { shoppingCart } = useContext(ShoppingCartContext)
    
    const shoppingCartLength = () => {
        if(shoppingCart.length >= 9) {
            return (
                <span className={styles.cartsProductsLength}>
                    +9
                </span>
            )
        } else if(shoppingCart.length <= 9 && shoppingCart.length !== 0) {
            return (
                <span className={styles.cartsProductsLength}>
                    {shoppingCart.length}
                </span>
            )
        } else if(shoppingCart.length === 0) {
            return false
        }
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link 
                    href="/" 
                    title="Voltar ao Início">
                    <Image 
                        src="/logo.svg" alt="Logo Coffee Delivery"
                        width={85} height={40} />
                </Link>
                
                <nav>
                    <div 
                        tabIndex={0}
                        className={styles.locationContainer}>
                        <MapPin size={20} weight="fill" />
                        Campinas, SP
                    </div>
                    
                    <Link 
                        href="/checkout"
                        title="Abrir carrinho">
                        <ShoppingCart size={20} weight="fill" />
                        {shoppingCartLength()}
                    </Link>
                </nav>
            </div>
        </header>
    )
}