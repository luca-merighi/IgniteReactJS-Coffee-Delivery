import React, { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { ShoppingCartContext } from '@/contexts/ShoppingCart'

import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import styles from './styles.module.scss'

export default function CheckoutSuccess() {
    const { order } = useContext(ShoppingCartContext)
    
    return (
        <React.Fragment>
            <Head>
                <title>
                    Compra Efetuada - Coffee Delivery
                </title>
            </Head>
            
            <section className={styles.checkoutSuccess}>
                <div className={styles.checkoutSuccessContainer}>
                    <div className={styles.confirmationText}>
                        <header>
                            <strong>
                                Uhul! Pedido confirmado
                            </strong>
                            <p>
                                Agora é só aguardar que logo o café chegará até você
                            </p>
                        </header>
                        
                        <div className={styles.bgGradient}>
                            <div className={styles.bgWhite}>
                                <ul>
                                    <li>
                                        <div>
                                            <MapPin size={24} weight="fill" />
                                        </div>
                                        
                                        <span>
                                            Entrega em <strong>{order?.street}, {order?.number}</strong> <br />
                                            {order?.district} - {order?.city}, {order?.uf}
                                        </span>
                                    </li>
                                    
                                    <li>
                                        <div>
                                            <Timer size={24} weight="fill" />
                                        </div>
                                        
                                        <span>
                                            Previsão de Entrega <br />
                                            <strong>
                                                20 min - 30 min
                                            </strong>
                                        </span>
                                    </li>
                                    
                                    <li>
                                        <div>
                                            <CurrencyDollar size={24} weight="fill" />
                                        </div>
                                        
                                        <span>
                                            Pagamento na Entrega <br />
                                            <strong>
                                                {order?.paymentType === 
                                                    'credit' ? 'Cartão de Crédito' 
                                                    : order?.paymentType === 'debit' 
                                                    ? 'Cartão de Débito' : 'Dinheiro'} 
                                            </strong>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <figure>
                        <Image 
                            src="/bg-delivery.svg" 
                            alt="Imagem demonstrativa de um entregador em uma moto com o pedido"
                            width={490} height={290} />
                    </figure>
                </div>
            </section>
        </React.Fragment>
    )
}