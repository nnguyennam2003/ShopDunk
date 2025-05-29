import React from 'react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

export default function CreateBtn({ title = "Create", description = "", children }) {
  return (
      <Dialog>
          <DialogTrigger asChild>
              <Button variant="outline">
                  <Plus />
              </Button>
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  {description && <DialogDescription>{description}</DialogDescription>}
              </DialogHeader>
              {children}
          </DialogContent>
      </Dialog>
  )
}
