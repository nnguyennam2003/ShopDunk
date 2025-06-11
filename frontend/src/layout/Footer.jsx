import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full bg-[#F5F5F7] py-8 mt-10'>
      <div className='w-full sm:max-w-[85%] px-6 md:px-0 sm:px-0 mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-2">ShopDunk</div>
            <p className="text-gray-600 text-sm mb-3">
              Hệ thống cửa hàng Apple chính hãng, uy tín, giá tốt tại Việt Nam.
            </p>
            <div className="flex gap-3 mt-3">
              <a href="https://facebook.com/applestore" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" className="w-6 h-6 opacity-70 hover:opacity-100" />
              </a>
              <a href="https://zalo.me/0123456789" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zalo.svg" alt="Zalo" className="w-6 h-6 opacity-70 hover:opacity-100" />
              </a>
              <a href="mailto:info@applestore.vn">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/maildotru.svg" alt="Email" className="w-6 h-6 opacity-70 hover:opacity-100" />
              </a>
            </div>
          </div>
     
          <div>
            <div className="font-semibold mb-2 text-gray-800">Chính sách</div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:underline">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:underline">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:underline">Chính sách giao hàng</a></li>
              <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
            </ul>
          </div>
    
          <div>
            <div className="font-semibold mb-2 text-gray-800">Hỗ trợ khách hàng</div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:underline">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:underline">Hướng dẫn thanh toán</a></li>
              <li><a href="#" className="hover:underline">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:underline">Liên hệ hỗ trợ</a></li>
            </ul>
          </div>
         
          <div>
            <div className="font-semibold mb-2 text-gray-800">Liên hệ</div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Địa chỉ: 123 Đường Apple, Quận 1, TP.HCM</li>
              <li>Điện thoại: <a href="tel:0123456789" className="hover:underline text-blue-600">0123 456 789</a></li>
              <li>Email: <a href="mailto:info@applestore.vn" className="hover:underline text-blue-600">info@applestore.vn</a></li>
              <li>Giờ làm việc: 8:00 - 21:00 (T2 - CN)</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} AppleStore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
