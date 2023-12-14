import React from 'react'
import type { AppProps } from 'next/app'
import CoffeesProvider from '@/contexts/Coffees'

import Header from '@/components/Header'

import '../global.scss'
import ShoppingCartProvider from '@/contexts/ShoppingCart'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CoffeesProvider>
      <ShoppingCartProvider>
        <Header />
        <Component {...pageProps} />
      </ShoppingCartProvider>
    </CoffeesProvider>
  )
}
