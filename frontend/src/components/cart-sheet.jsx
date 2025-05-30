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
import { LogIn, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function CartSheet() {
  return (
      <Sheet>
          <SheetTrigger className="hidden md:flex"><Button variant='outline'><ShoppingBag /></Button></SheetTrigger>
          <SheetContent>
              <SheetHeader>
                  <SheetTitle>ShopDunk</SheetTitle>
                  <SheetDescription>
                     
                  </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                  <Link to={'/login'}><Button variant={'outline'}><LogIn /></Button></Link>
              </SheetFooter>
          </SheetContent>
      </Sheet>
  )
}
