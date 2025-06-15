import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { bannerHome, hotProducts } from '@/helpers/FixedData';
import { CreditCard, MonitorSmartphone, ShoppingCart, Truck } from 'lucide-react';

export default function Home() {
    useEffect(() => {
        document.title = "Apple - Trang chủ"
    }, [])

    return (
        <>
            <section>
                <h1 className="text-2xl sm:text-4xl font-bold sm:mt-14 mt-5">
                    ShopDunk
                </h1>
                <p className='text-2xl sm:text-4xl font-bold text-gray-500 sm:mt-2 mb-8'>Đại lý ủy quyền của Apple tốt nhất. </p>

                <div>
                    <Swiper
                        className='mySwiper rounded-2xl shadow-lg'
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                    >
                        {
                            bannerHome.map((banner) => (
                                <SwiperSlide key={banner.id} className='rounded-2xl'>
                                    <img src={banner.image} alt={`Banner ${banner.id}`} className="w-full h-auto rounded-2xl" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </section>

            <section className='w-full mt-16'>
                <h2  className="text-xl sm:text-2xl font-bold mb-4">Thế hệ mới nhất. <span className='text-gray-500'>Xem ngay có gì mới.</span></h2>
                <div>
                    <Swiper
                        slidesPerView={3.7}
                        spaceBetween={30}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay]}
                        className="mySwipe"
                        breakpoints={{
                            320: {
                                slidesPerView: 1.5,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                          }}
                    >
                        {hotProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className='relative rounded-2xl border-1'>
                                    <img src={product.image} alt={product.title} className='w-full h-auto object-cover rounded-2xl' />
                                    <div className={`absolute top-2 left-0 right-0 bg-opacity-80 p-4 rounded-b-2xl`} style={{ color: product.colorText }}>
                                        <h3 className='text-lg font-semibold'>{product.title}</h3>
                                        <p className='text-sm'>{product.subTitle}</p>
                                        <p className='text-base font-bold mt-2'>{product.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className='w-full mt-16'>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Apple Store tạo nên mọi khác biệt. <span className='text-gray-500'>Thêm nhiều lý do để mua sắm cùng chúng tôi.</span></h2>
                <div className='flex flex-col sm:flex-row gap-4 items-center justify-between mt-6'>
                    <div className='md:w-[20%] w-full md:h-56 bg-violet-300 shadow-lg rounded-2xl flex flex-col p-6 pt-10'>
                        <div className="mb-2"><CreditCard size={40}/></div>
                        <p className='text-xl font-bold'>Thanh toán hàng tháng thật dễ dàng. Bao gồm lựa chọn lãi suất 0%</p>
                    </div>
                    <div className='md:w-[20%] w-full md:h-56 bg-amber-100 shadow-lg rounded-2xl flex flex-col p-6 pt-10'>
                        <div className="mb-2"><MonitorSmartphone size={40}/></div>
                        <p className='text-xl font-bold'>Đổi thiết bị cũ đủ điều kiện, nhận điểm tín dụng để mua thiết bị mới.</p>
                    </div>
                    <div className='md:w-[20%] w-full md:h-56 bg-blue-100 shadow-lg rounded-2xl flex flex-col p-6 pt-10'>
                        <div className="mb-2"><Truck size={40}/></div>
                        <p className='text-xl font-bold'>Giao hàng miễn phí</p>
                    </div>
                    <div className='md:w-[20%] w-full md:h-56 bg-emerald-100 shadow-lg rounded-2xl flex flex-col p-6 pt-10'>
                        <div className="mb-2"><ShoppingCart size={40}/></div>
                        <p className='text-xl font-bold'>Trải nghiệm mua sắm được cá nhân hóa.</p>
                    </div>
                </div>
            </section>

            <section className='w-full mt-16'>
                {/* <ProductGrid products={products} /> */}
            </section>
        </>
    )
}
