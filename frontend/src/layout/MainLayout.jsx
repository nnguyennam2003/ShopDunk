import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className='container mx-auto'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
