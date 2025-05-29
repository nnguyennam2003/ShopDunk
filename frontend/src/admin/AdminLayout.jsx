import React from 'react'
import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'


export default function AdminLayout() {
    console.log("AdminLayout rendered")
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className='flex-1 flex flex-col overflow-hidden px-5 py-4'>
                    <SidebarTrigger className='-ml-1.5'/>
                    <Outlet />
                </main>

            </SidebarProvider>
        </>
    )
}
