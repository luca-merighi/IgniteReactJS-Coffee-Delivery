import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import {OrderFormInput} from '../Checkout/CheckoutForm'

import styles from './styles.module.scss'
import {MapPin, Timer, CurrencyDollar} from 'phosphor-react'

interface LocationType {
    state: OrderFormInput
}

export default function CheckoutSuccession() {
    const {state} = useLocation() as unknown as LocationType
    
    return (
        <div>
            <Header />
            
            <section className={styles.checkoutSuccession}>
                <div className={styles.checkoutSuccessionContainer}>
                    <div className={styles.confirmationText}>
                        <header>
                            <h1>
                                Uhu! Pedido confirmado
                            </h1>
                            <p>
                                Agora é só aguardar que logo o café chegará até você
                            </p>
                        </header>
                        
                        <div className={styles.bgGradient}>
                            <div className={styles.bgWhite}>
                                <ul className={styles.deliveryInfo}>
                                    <li className={styles.item}> 
                                        <div>
                                            <MapPin size={24} weight="fill" />
                                        </div>
                                        
                                        <span>
                                            Entrega em <span>{state.street}</span>, <br />
                                            {state.distric} - {state.city}, {state.uf}
                                        </span>
                                    </li>
                                    <li className={styles.item}>
                                        <div>
                                            <Timer size={24} weight="fill" />
                                        </div>
                                        
                                        <span>
                                            Previsão de Entrega <br />
                                            <span>
                                                20 min - 30 min
                                            </span>
                                        </span>
                                    </li>
                                    <li className={styles.item}>
                                        <div>
                                            <CurrencyDollar size={24} weight="fill" />
                                        </div>
                                        
                                        <span>
                                            Pagamento na entrega <br />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <figure>
                        <img 
                        src="/bg-delivery.svg" 
                        alt="Imagem demonstrativa de um entregador em uma moto com o pedido" />
                    </figure>
                </div>
            </section>
        </div>
    )
}