import CoffeeCard from '../CoffeeCard'
import { useProducts } from '../../hooks/products'

import styles from './styles.module.scss'

export default function CoffeeMenuList() {
    const {products} = useProducts()
    
    return (
        <section className={styles.coffeeMenuList}>
            <div className={styles.coffeeMenuListContainer}>
                <header>
                    <h1>
                        Nossos Cafés
                    </h1>
                </header>
                
                <ul className={styles.coffeeMenu}>
                    {products.map(product => (
                        <CoffeeCard key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </section>
    )
}