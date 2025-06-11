import React from 'react'
import { Textarea } from "@/components/ui/textarea"

export default function AddressDetail({ addressDetail, setAddressDetail }) {
    return (
        <Textarea
            value={addressDetail}
            onChange={e => setAddressDetail(e.target.value)}
            className='w-full mt-4'
            placeholder='Địa chỉ nhà'
        />
    )
}