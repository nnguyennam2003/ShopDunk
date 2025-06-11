import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const items = [
        { name: 'Mac', path: '/category/mac' },
        { name: 'iPad', path: '/category/ipad' },
        { name: 'iPhone', path: '/category/iphone' },
        { name: 'Watch', path: '/category/watch' },
        { name: 'AirPods', path: '/category/airpods' },
        { name: 'Phụ kiện', path: '/category/accessories' },
        { name: 'Liên hệ', path: '/contact' }
    ]
    
    return (
        <nav>
            <ul className='hidden md:flex items-center justify-center md:gap-3'>
                {items.map((item, index) => (
                    <li key={index}>
                        <Button asChild variant="ghost" className='font-normal cursor-pointer'><Link to={item.path}>{item.name}</Link></Button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
