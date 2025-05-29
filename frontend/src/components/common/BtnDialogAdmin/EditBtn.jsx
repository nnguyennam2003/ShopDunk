// components/common/DialogEditButton.jsx
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPen } from "lucide-react";

export default function EditBtn({
    title,
    description = "",
    children,
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <UserPen />
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
    );
}
