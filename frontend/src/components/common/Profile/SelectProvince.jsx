import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCity, getAllDistrict, getAllWard } from '@/services/province';


export default function SelectProvince({ addressSelect, setAddressSelect }) {
    const [citys, setCitys] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const getCityData = async () => {
            try {
                const res = await getAllCity()
                setCitys(res.data)
            } catch (err) {
                console.error(err)
            }
        };
        getCityData();
    }, [])

    useEffect(() => {
        const getDistrictData = async () => {
            try {
                const res = await getAllDistrict(addressSelect.city ? citys.find(c => c.name === addressSelect.city)?.code : "");
                setDistricts(res.data.districts || []);
            } catch (err) {
                setDistricts([])
                console.log(err)
            }
        };
        if (addressSelect.city) {
            getDistrictData();
        } else {
            setDistricts([]);
        }
        setAddressSelect(prev => ({ ...prev, district: '', ward: '' }));
        setWards([]);
        // eslint-disable-next-line
    }, [addressSelect.city]);

    useEffect(() => {
        const getWardData = async () => {
            try {
                const res = await getAllWard(addressSelect.district ? districts.find(d => d.name === addressSelect.district)?.code : "");
                setWards(res.data.wards || []);
            } catch (err) {
                setWards([]);
                console.log(err)
            }
        };
        if (addressSelect.district) {
            getWardData();
        } else {
            setWards([]);
        }
        setAddressSelect(prev => ({ ...prev, ward: '' }));
        // eslint-disable-next-line
    }, [addressSelect.district]);

    const handleChangeCity = (value) => {
        setAddressSelect(prev => ({ ...prev, city: value }));
    };

    const handleChangeDistrict = (value) => {
        setAddressSelect(prev => ({ ...prev, district: value }));
    };

    const handleChangeWard = (value) => {
        setAddressSelect(prev => ({ ...prev, ward: value }));
    };

    return (
        <div className='flex gap-10'>
            <div className='w-52'>
                <Label className="text-sm">Thành phố</Label>
                <Select value={addressSelect.city} onValueChange={handleChangeCity}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn thành phố" />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
                        {citys.map((city) => (
                            <SelectItem key={city.code} value={city.name}>{city.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='w-52'>
                <Label className="text-sm">Quận/Huyện</Label>
                <Select value={addressSelect.district} disabled={districts.length === 0} onValueChange={handleChangeDistrict}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
                        {districts.map((district) => (
                            <SelectItem key={district.code} value={district.name}>{district.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='w-52'>
                <Label className="text-sm">Phường/Xã</Label>
                <Select value={addressSelect.ward} disabled={wards.length === 0} onValueChange={handleChangeWard}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
                        {wards.map((ward) => (
                            <SelectItem key={ward.code} value={ward.name}>{ward.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}