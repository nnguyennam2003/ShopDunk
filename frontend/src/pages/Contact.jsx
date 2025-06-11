import React from 'react'
import bannerContact from '@/assets/images/banner-contact.jpg'
export default function Contact() {
    return (
        <div>
            <div className='w-full mt-2 rounded-2xl'>
                <img src={bannerContact} alt="banner" className='rounded-2xl' />
            </div>
            <h2 className='text-center mt-6 font-bold text-3xl'>Liên hệ chúng tôi</h2>

            <div className='flex gap-10'>
                <div className="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold w-32">Địa chỉ:</span>
                        <span>123 Đường Apple, Quận 1, TP.HCM</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold w-32">Số điện thoại:</span>
                        <a href="tel:0123456789" className="text-blue-600 hover:underline">0935 398 429</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold w-32">Email:</span>
                        <a href="mailto:info@applestore.vn" className="text-blue-600 hover:underline">nguyenminhnam1739@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold w-32">Giờ làm việc:</span>
                        <span>8:00 - 21:00 (Thứ 2 - Chủ nhật)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold w-32">Fanpage:</span>
                        <a href="https://www.facebook.com/nmnam2003" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">facebook.com/applestore</a>
                    </div>
                </div>

                <div className="flex-1 mx-auto mt-8 rounded-xl overflow-hidden shadow">
                    <iframe title="Apple Store Map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6573.241933551808!2d108.21429045871338!3d16.06867536027453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1749627803430!5m2!1svi!2s" width="100%" height="350" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

        </div>
    )
}
