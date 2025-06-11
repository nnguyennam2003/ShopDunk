import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, getListAddress, setDefaultAddress } from '@/store/slices/addressSlice';
import { Switch } from "@/components/ui/switch"

export default function TableProfile() {
    const { addresses } = useSelector((state) => state.address)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListAddress())
    }, [dispatch])

    const handleSetDefault = (addressId) => {
        dispatch(setDefaultAddress(addressId));
    }

    const handleDelete = (addressId) => {
        dispatch(deleteAddress(addressId));
    }

    return (
        <>
            <h1 className='text-2xl font-bold mt-10'>Địa chỉ của bạn</h1>
            <Table className="w-full mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Thành phố
                        </TableHead>
                        <TableHead>
                            Quận/huyện
                        </TableHead>
                        <TableHead>
                            Phường/xã
                        </TableHead>
                        <TableHead>
                            Số nhà
                        </TableHead>
                        <TableHead>
                            Mặc định
                        </TableHead>
                        <TableHead className='w-20'>
                            Xóa
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        (Array.isArray(addresses) ? addresses : []).map((address) => (
                            <TableRow key={address.id}>
                                <TableCell>{address.city}</TableCell>
                                <TableCell>{address.district}</TableCell>
                                <TableCell>{address.ward}</TableCell>
                                <TableCell>{address.address_detail}</TableCell>
                                <TableCell>
                                    <Switch checked={address.is_default} onCheckedChange={() => handleSetDefault(address.id)} />
                                </TableCell>
                                <TableCell className='w-20'>
                                    <Button variant='destructive' size='sm' className='mx-auto' onClick={() => handleDelete(address.id)}><Trash /></Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
