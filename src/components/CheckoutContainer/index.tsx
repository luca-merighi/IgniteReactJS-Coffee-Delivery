import { useFormContext, Controller } from 'react-hook-form'
import { PaymentMethod } from '@/pages/checkout/index.page'
import * as RadioGroup from '@radix-ui/react-radio-group'

import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from 'phosphor-react'
import styles from './styles.module.scss'

interface CheckoutContainerProps {
    paymentMethod: string,
    handlePaymentMethod: (paymentMethod: PaymentMethod) => void
}

export default function CheckoutContainer(props: CheckoutContainerProps) {
    const { register, control } = useFormContext()
    
    return (
        <section className={styles.checkoutContainer}>
            <strong>
                Complete seu pedido
            </strong>
            
            <div className={styles.inputsContainer}>
                <div className={styles.address}>
                    <header>
                        <MapPinLine size={24} />
                        <p>
                            <span>Endereço de entrega</span> <br />
                            Infrome o endereço onde deseja receber seu pedido
                        </p>
                    </header>
                    
                    <div className={styles.inputs}>
                        <input 
                            type="text"
                            placeholder="CEP"
                            {...register('cep')} />
                        <input 
                            type="text"
                            placeholder="Rua"
                            {...register('street')} />
                        <input 
                            type="text"
                            placeholder="Número"
                            {...register('number')} />
                        <input 
                            type="text"
                            placeholder="Complemento"
                            {...register('complement')} />
                        <input 
                            type="text"
                            placeholder="Bairro"
                            {...register('district')} />
                        <input 
                            type="text"
                            placeholder="Cidade"
                            {...register('city')} />
                        <input 
                            type="text"
                            placeholder="UF"
                            {...register('uf')} />
                    </div>
                </div>
                
                <div className={styles.payment}>
                    <header>
                        <CurrencyDollar size={24} />
                        <p>
                            <span>Pagamento</span> <br />
                            O pagamento é feito na entrega. Escolha a forma que deseja pagar
                        </p>
                    </header>
                    
                    <Controller 
                        control={control}
                        name="paymentType"
                        render={({field}) => {
                            return (
                                <RadioGroup.Root
                                    onValueChange={field.onChange}
                                    className={styles.paymentMethod}>
                                    <RadioGroup.Item 
                                        value="credit">
                                        <CreditCard size={24} />
                                        Cartão de Crédito
                                    </RadioGroup.Item>
                                    <RadioGroup.Item 
                                        value="debit">
                                        <Bank size={24} />
                                        Cartão de Débito
                                    </RadioGroup.Item>
                                    <RadioGroup.Item 
                                        value="money">
                                        <Money size={24} />
                                        Dinheiro
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            )
                        }}
                    />
                </div>
            </div>
        </section>
    )
}