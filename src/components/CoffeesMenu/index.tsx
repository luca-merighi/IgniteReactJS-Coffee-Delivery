import { useContext } from 'react'
import { CoffeesContext } from '@/contexts/Coffees'

import CoffeeCard from './CoffeeCard'

import styles from './styles.module.scss'

export default function CoffeeMenu() {
    const { coffees } = useContext(CoffeesContext)
    
    return (
        <section className={styles.coffeeMenu}>
            <div className={styles.coffeeMenuContainer}>
                <header>
                    <h1>
                        Nossos Cafés
                    </h1>
                </header>
                
                <ul>
                    {coffees.map(coffee => {
                        return (
                            <CoffeeCard 
                                key={coffee.id}
                                coffee={coffee}/>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}