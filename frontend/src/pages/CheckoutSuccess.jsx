import { Button } from '@/components/ui/button';
import { CheckCheck, CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import { CheckLine } from 'lucide-react';

export default function CheckoutSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state?.success) {
            navigate('/', { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center gap-1'>
                <CheckCheck strokeWidth={3} style={{ color: 'white', width: '100px', height: '100px', background: 'lightgreen', padding: '10px', borderRadius: '50%' }} />
                <h1 className='text-2xl mt-3'>Đặt hàng thành công!</h1>
                <p className='text-gray-500 text-xl'>Chúng tôi đã xác nhận đơn hàng của bạn và sẽ giao đến bạn trong khoảng 5-7 ngày tới.</p>
                <p className='text-gray-500 text-xl'>Cảm ơn bạn đã mua hàng</p>
                <Button variant='outline' className='mt-10' onClick={() => navigate('/')}>Quay về trang chủ</Button>
            </div>
        </div>
    )
}
