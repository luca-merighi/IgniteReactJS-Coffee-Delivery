import React, { useContext, useState } from 'react'
import Head from 'next/head'
import { ShoppingCartContext } from '@/contexts/ShoppingCart'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'

import CheckoutContainer from '@/components/CheckoutContainer'
import ShoppingCart from '@/components/ShoppingCar'

import styles from './styles.module.scss'

enum PaymentMethods {
    credit = 'credit',
    debit = 'debit',
    money = 'money'
}

const orderFormSchema = zod.object({
    cep: zod.string().min(1, "Informe o CEP"),
    street: zod.string().min(1, "Informe a Rua"),
    number: zod.string().min(1, "Informe o Número"),
    complement: zod.string().min(1, "Informe o Complemento"),
    district: zod.string().min(1, "Informe o Bairro"),
    city: zod.string().min(1, "Informe a Cidade"),
    uf: zod.string().min(1, "Informe A UF"),
    paymentType: zod.nativeEnum(PaymentMethods, {
        errorMap: () => {
            return { message: "Informe o Método de Pagamento"}
        }
    })
})

export type PaymentMethod = 'credit' | 'debit' | 'money' | ''
export type OrderFormInput = zod.infer<typeof orderFormSchema>
export type Order = {
    street: string,
    number: string,
    district: string,
    city: string,
    uf: string,
    paymentType: string
}

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('')
    const { shoppingCart, cleanShoppingCart, handleCompletedOrder } = useContext(ShoppingCartContext)
    const confirmOrderForm = useForm<OrderFormInput>({
        resolver: zodResolver(orderFormSchema),
    })
    const { handleSubmit, formState: { isSubmitting } } = confirmOrderForm
    const router = useRouter()
    
    function handlePaymentMethod(type: PaymentMethod) {
        setPaymentMethod(type)
    }
    
    async function handleConfirmOrder(orderOBJ: OrderFormInput) {
        const { street, number, district, city, uf, paymentType  } = orderOBJ
        
        const order = {
            street: street,
            number: number,
            district: district,
            city: city,
            uf: uf,
            paymentType: paymentType
        }
        
        cleanShoppingCart()
        handleCompletedOrder(order)
        router.push('/checkout-success')
    }
    
    return (
        <React.Fragment>
            <Head>
                <title>Checkout - Coffee Delivery</title>
            </Head>
            
            <div className={styles.checkout}>
                {shoppingCart.length === 0 ? (
                    <div className={styles.emptyShoppingCart}>
                        <h3>
                            Parece que não há produtos <br />
                            no seu carrinho :&#40;
                        </h3>
                    </div>
                ) : (
                    <form 
                        onSubmit={handleSubmit(handleConfirmOrder)}
                        className={styles.form}>
                        <FormProvider {...confirmOrderForm}>
                            <CheckoutContainer
                                paymentMethod={paymentMethod}
                                handlePaymentMethod={handlePaymentMethod} />
                            
                            <ShoppingCart
                                isFormSubmitting={isSubmitting} />
                        </FormProvider>
                    </form>
                )}    
            </div>
        </React.Fragment>
    )
}

