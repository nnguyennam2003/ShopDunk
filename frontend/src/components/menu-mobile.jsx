import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogIn, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function MenuMobile() {
    
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
            <SheetTrigger className="md:hidden"><Button variant={'outline'}><Menu /></Button></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>ShopDunk</SheetTitle>
                    <SheetDescription>
                        <nav>
                            <ul className='flex flex-col items-start gap-2'>
                                {items.map((item, index) => (
                                    <Link to={item.path} key={index} className='w-full pt-2 border-t border-gray-200 last:border-b-0 first:border-t-0'>
                                        <Button variant="ghost" className='font-semibold text-black cursor-pointer justify-start w-full'>
                                            {item.name}
                                        </Button>
                                    </Link>
                                ))}
                            </ul>
                        </nav>
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Link to={'/login'}><Button variant={'outline'}><LogIn /></Button></Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
