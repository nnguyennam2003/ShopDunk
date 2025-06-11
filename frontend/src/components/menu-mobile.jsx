import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogIn, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function MenuMobile() {
    const navigate = useNavigate()

    const items = [
        { name: 'Mac', path: '/categories' },
        { name: 'iPad', path: '/products' },
        { name: 'iPhone', path: '/' },
        { name: 'Watch', path: '/about' },
        { name: 'AirPods', path: '/contact' },
        { name: 'Accessories', path: '/accessories' },
        { name: 'Contact', path: '/contact' }
    ]

    return (
        <Sheet>
            <SheetTrigger asChild className="md:hidden"><Button variant={'outline'}><Menu /></Button></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>ShopDunk</SheetTitle>
                    <div className='flex flex-col items-start gap-2'>
                        {items.map((item, index) => (
                            <Button key={index} variant="ghost" className='font-semibold text-black cursor-pointer justify-start w-full'>
                                {item.name}
                            </Button>
                        ))}
                    </div>
                </SheetHeader>
                <SheetFooter>
                    <Button variant={'outline'} className='w-fit' onClick={() => navigate('/login')}>Login<LogIn /></Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
