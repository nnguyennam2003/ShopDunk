import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
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
        <nav>
            <ul className='hidden md:flex items-center justify-center md:gap-3'>
                {items.map((item, index) => (
                    <li key={index}>
                        <Button variant="ghost" className='font-normal cursor-pointer'><Link to={item.path}>{item.name}</Link></Button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
