import {Routes, Route} from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Checkout from './pages/Checkout'
import CheckoutSuccession from './pages/CheckoutSuccession'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-succession" element={<CheckoutSuccession />} />
        </Routes>
    )
}