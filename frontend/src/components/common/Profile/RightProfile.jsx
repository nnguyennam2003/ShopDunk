import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { formatDateToDMY } from '@/helpers/FormatDataNumber';
import { useDispatch, useSelector } from 'react-redux';
import TableProfile from '@/components/common/Profile/TableProfile';
import SelectProvince from '@/components/common/Profile/SelectProvince';
import AddressDetail from '@/components/common/Profile/AddressDetail';
import { createAddress } from '@/store/slices/addressSlice'
import { enumGenderSwitch } from '@/helpers/SwitchDataEnum'

export default function RightProfile() {
    const { user } = useSelector((state) => state.auth)
    const [addressSelect, setAddressSelect] = useState({ city: '', district: '', ward: '' });
    const [addressDetail, setAddressDetail] = useState('');

    const dispatch = useDispatch()

    const handleAddAddress = (e) => {
        e.preventDefault();
        dispatch(createAddress({
            address_detail: addressDetail,
            city: addressSelect.city,
            district: addressSelect.district,
            ward: addressSelect.ward,
            is_default: false
        })).then((res) => {
            if (!res.error) {
                setAddressSelect({ city: '', district: '', ward: '' });
                setAddressDetail('');
            }
        });
    }

    return (
        <Tabs defaultValue="information" className="w-full">
            <TabsList>
                <TabsTrigger value="information">Thông tin</TabsTrigger>
                <TabsTrigger value="address">Địa chỉ</TabsTrigger>
            </TabsList>
            <TabsContent value="information" className='w-full'>
                <form className='flex flex-col gap-4 mt-5'>
                    <div className='flex items-center gap-2'>
                        <Label className='text-sm text-nowrap font-semibold'>Họ tên :</Label>
                        <Input defaultValue={user.fullName} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label className='text-sm text-nowrap font-semibold'>Email :</Label>
                        <Input defaultValue={user.email} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label className='text-sm text-nowrap font-semibold'>Số điện thoại :</Label>
                        <Input defaultValue={user.phone} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label className='text-sm text-nowrap font-semibold'>
                            Ngày sinh :
                        </Label>
                        <Input defaultValue={formatDateToDMY(user.birthday)} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label className='text-sm text-nowrap font-semibold'>
                            Giới tính :
                        </Label>
                        <Input defaultValue={enumGenderSwitch(user.gender)} />
                    </div>
                    <div className='flex justify-end'>
                        <Button className='mt-5 w-48' variant='default'>Cập nhật thông tin</Button>
                    </div>
                </form>
            </TabsContent>
            <TabsContent value="address">
                <form className='mt-5'>
                    <SelectProvince addressSelect={addressSelect} setAddressSelect={setAddressSelect} />
                    <AddressDetail addressDetail={addressDetail} setAddressDetail={setAddressDetail} />
                    <div className='flex justify-end mt-2'>
                        <Button
                            className='w-48'
                            variant='outline'
                            onClick={handleAddAddress}
                            disabled={
                                !addressSelect.city ||
                                !addressSelect.district ||
                                !addressSelect.ward ||
                                !addressDetail
                            }
                        >
                            Add address
                        </Button>
                    </div>
                </form>
                <TableProfile />
            </TabsContent>
        </Tabs>
    )
}