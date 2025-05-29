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
                <main>
                    <SidebarTrigger />
                    <Outlet />
                </main>

            </SidebarProvider>
        </>
    )
}
