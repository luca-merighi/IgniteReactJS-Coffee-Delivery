import Image from 'next/image'

import { ShoppingCart, Package, Coffee, Timer } from 'phosphor-react'
import styles from './styles.module.scss'

export default function Landingpage() {
    return (
        <section className={styles.landingPage}>
            <div className={styles.landingPageContainer}>
                <div className={styles.text}>
                    <h1>
                        Encontre o café perfeito <br />
                        para qualquer hora do dia
                    </h1>
                    
                    <p>
                        Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
                    </p>
                    
                    <ul>
                        <li>
                            <div>
                                <ShoppingCart size={24} weight="fill" />
                            </div>
                            
                            <span>
                                Compra simples e segura
                            </span>
                        </li>
                        <li>
                            <div>
                                <Package size={24} weight="fill" />
                            </div>
                            
                            <span>
                                Embalagem mantém o café intacto
                            </span>
                        </li>
                        <li>
                            <div>
                                <Coffee size={24} weight="fill" />
                            </div>
                            
                            <span>
                                Entrega rápida e rastreada
                            </span>
                        </li>
                        <li>
                            <div>
                                <Timer size={24} weight="fill" />
                            </div>
                            
                            <span>
                                O café chega fresquinho até você
                            </span>
                        </li>
                    </ul>
                </div>
                
                <figure className={styles.imageContainer}>
                    <Image
                        src="/coffee-cup.png" alt="Imagem demonstrativa de um copo de café com graõs ao seu redor"
                        width={476} height={360} />
                </figure>
            </div>
        </section>
    )
}