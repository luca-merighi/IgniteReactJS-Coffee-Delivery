import {useState} from 'react'
import { useFormContext } from 'react-hook-form'

import {MapPinLine, CurrencyDollar, CreditCard, Bank} from 'phosphor-react'
import styles from './styles.module.scss'

export type paymentType = 'credit' | 'debit' | 'money' | ''

export default function CheckoutSection() {
    const [paymentMethod, setPaymentMethod] = useState<paymentType>('')
    const { register } = useFormContext()
    
    function handlePaymentMethod(type: paymentType) {
        setPaymentMethod(type)
    }
    
    return (
        <div className={styles.checkout}>
            <h1>
                Complete seu pedido
            </h1>
                  
            <div className={styles.formContainer}>
                <div className={styles.addressContainer}>
                    <header>
                        <MapPinLine size={24} />
                        <p>
                            <span>Endereço de Entrega</span> <br />
                            Informe o endereço onde deseja receber seu pedido
                        </p>
                    </header>
                
                    <div className={styles.inputs}>
                        <input type="text" placeholder="CEP" {...register('cep')} />        
                        <input type="text" placeholder="Rua" {...register('street')} />        
                        <input type="text" placeholder="Número" {...register('number')} />        
                        <input type="text" placeholder="Complemento" {...register('complement')} />        
                        <input type="text" placeholder="Bairro" {...register('distric')} />        
                        <input type="text" placeholder="Cidade" {...register('city')} />        
                        <input type="text" placeholder="UF" {...register('uf')} />     
                    </div>
                </div>
                
                <div className={styles.paymentContainer}>
                    <header>
                        <CurrencyDollar size={24} />
                        <p>
                            <span>Pagamento</span> <br />
                            O pagamento é feito na entrega. Escolha a forma que deseja pagar
                        </p>
                    </header>
                    
                    <div className={styles.paymentMethod}>
                        <button 
                        type="button"
                        className={paymentMethod === 'credit' ? `${styles.paymentMethod}` : ''}
                        onClick={() => handlePaymentMethod('credit')}>
                            <CreditCard size={24} />
                            Cartão de Crédito
                        </button>
                        <button 
                        type="button"
                        className={paymentMethod === 'debit' ? `${styles.paymentMethod}` : ''}
                        onClick={() => handlePaymentMethod('debit')}>
                            <Bank size={24} />
                            Cartão de Débito
                        </button>
                        <button 
                        type="button"
                        className={paymentMethod === 'money' ? `${styles.paymentMethod}` : ''}
                        onClick={() => handlePaymentMethod('money')}>
                            <CreditCard size={24} />
                            Dinheiro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}