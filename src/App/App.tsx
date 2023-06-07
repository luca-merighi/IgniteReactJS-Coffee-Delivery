import Router from '../Router'
import ProductsProvider from '../hooks/products'
import ShoppingCart from '../hooks/shoppingCart'

export default function App() {
  return (
    <ProductsProvider>
      <ShoppingCart>
        <Router />
      </ShoppingCart>
    </ProductsProvider>
  )
}