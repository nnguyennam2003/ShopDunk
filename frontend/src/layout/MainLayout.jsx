import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export default function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    
    return (
        <>
            <Header />
            <main className='w-full sm:max-w-[85%] px-6 md:px-0 sm:px-0 mx-auto mb-22'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
