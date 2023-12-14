import React from 'react'
import Head from 'next/head'

import Landingpage from '@/components/LandingPage'
import CoffeeMenu from '@/components/CoffeesMenu'

export default function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Home - Coffee Delivery</title>
            </Head>
            
            <Landingpage />
            
            <CoffeeMenu />
        </React.Fragment>
    )
}