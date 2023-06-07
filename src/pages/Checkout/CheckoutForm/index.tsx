import { useShoppingCart } from '../../../hooks/shoppingCart'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CheckoutSection from '../CheckoutSection'
import ShoppingCart from '../ShoppingCart'

import styles from './styles.module.scss'

const orderFormSchema = zod.object({
    cep: zod.string().min(1),
    street: zod.string().min(1),
    number: zod.string().min(1),
    complement: zod.string().min(1),
    distric: zod.string().min(1),
    city: zod.string().min(1),
    uf: zod.string().min(1)
})

export type OrderFormInput = zod.infer<typeof orderFormSchema>

export default function CheckoutForm() {
    const {shoppingCart, clearShoppingCart} = useShoppingCart()
    const confirmOrderForm = useForm<OrderFormInput>({
        resolver: zodResolver(orderFormSchema)
    })
    const { handleSubmit } = confirmOrderForm
    const navigate = useNavigate()
    
    function handleConfirmOrder(data: OrderFormInput) {
        navigate('/checkout-succession', {
            state: data
        })
        clearShoppingCart()
    }
    
    return (
        <section className={styles.checkoutForm}>
            {shoppingCart.length === 0 ? (
                <div className={styles.emptyCart}>
                    <h3>
                        Parece que não há produtos <br />
                        no seu carrinho.
                    </h3>
                    <span>
                        Adicione algum produto para começar!
                    </span>
                </div>
            ) : (
                <form
                onSubmit={handleSubmit(handleConfirmOrder)}
                className={styles.checkoutContainer}>
                    <FormProvider {...confirmOrderForm}>
                        <CheckoutSection />
                        
                        <ShoppingCart />
                    </FormProvider>
                </form>
            )}
        </section>
    )
}