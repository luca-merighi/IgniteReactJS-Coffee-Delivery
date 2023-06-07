import ListItem from '../ListItem'

import coffeeCup from '/coffee-cup.png'
import {ShoppingCart, Package, Coffee, Timer} from 'phosphor-react'
import styles from './styles.module.scss'

export default function Home() {
    return (
        <section className={styles.home}>
            <div className={styles.homeContainer}>
                <div className={styles.text}>
                    <h1>
                        Encontre o café perfeito <br />
                        para qualquer hora do dia
                    </h1>
                    
                    <p>
                        Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
                    </p>
                    
                    <ul>
                        <ListItem 
                            icon={<ShoppingCart size={24} weight="fill" />} 
                            text="Compra simples e segura" />
                        <ListItem 
                            icon={<Package size={24} weight="fill" />} 
                            text="Embalagem mantém o café intacto" />
                        <ListItem 
                            icon={<Coffee size={24} weight="fill" />} 
                            text="Entrega rápida e rastreada" />
                        <ListItem 
                            icon={<Timer size={24} weight="fill" />} 
                            text="O café chega fresquinho até você" />
                    </ul>
                </div>
                
                <figure>
                    <img 
                    src={coffeeCup} 
                    alt="Imagem demonstrativa de um copo de café com graõs ao seu redor" />
                </figure>
            </div>
        </section>
    )
}