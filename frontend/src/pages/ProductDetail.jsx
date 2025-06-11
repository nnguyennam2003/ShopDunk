import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/common/Product/ProductGrid';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { formatVND } from '@/helpers/FormatDataNumber';
import { Minus, Plus } from 'lucide-react';
import instance from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedStorage, setSelectedStorage] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([])

    const dispatch = useDispatch()

    const getProductById = async () => {
        setLoading(true)
        try {
            const res = await instance.get(`/product/${id}`);
            setProduct(res.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getRelatedProducts = async () => {
        try {
            const res = await instance.get(`/product/${id}/related`);
            setRelatedProducts(res.data);
        } catch (error) {
            console.error("Failed to fetch related products:", error);
        }
    }

    useEffect(() => {
        getProductById(id)
    }, [id])

    useEffect(() => {
        if (product) {
            getRelatedProducts();
        }
    }, [product])


    const handleAddToCart = async () => {
        if (!selectedColor || !selectedStorage) return
        dispatch(addToCart({ product_id: product.id, quantity, color: selectedColor, storage: selectedStorage }))
    }

    const handleQuantityChange = (operation) => {
        if (operation === "increase") setQuantity(prev => prev + 1)
        if (operation === "decrease") setQuantity(prev => prev - 1)
    }

    if (loading || !product) {
        return (
            <div className='mt-8'>
                <div className='flex gap-12 mt-5'>
                    <div className='w-2/3'>
                        <Skeleton className="w-full h-80 rounded-2xl mb-6" />
                        <div className='mt-10'>
                            <Skeleton className="h-8 w-1/2 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                    <div className='flex-1'>
                        <Skeleton className="h-10 w-2/3 mb-2" />
                        <Skeleton className="h-8 w-1/4 mb-2" />
                        <Skeleton className="h-6 w-1/4 mb-4" />
                        <Skeleton className="h-8 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div>
                    <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-[300px] w-[250px] rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-8'>
            <div className='flex gap-12 mt-5'>
                <div className='w-2/3'>
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper w-full"
                    >
                        {product.images.map((image, index) => (
                            <SwiperSlide key={index} className='bg-gray-100 rounded-2xl w-full h-80 p-10'>
                                <img src={image} alt={`Image ${index}`} className='w-full h-80 object-contain' />
                            </SwiperSlide>
                        ))}
                    </Swiper>


                    <div className='mt-10'>
                        <h2 className='font-semibold text-2xl'>Đặc điểm nổi bật của <span className='text-gray-500'>{product.name}</span></h2>
                        <p className='mt-4 text-gray-600'>
                            iPhone 13 thường được trang bị chip A15 Bionic mạnh mẽ với 6 nhân CPU và 4 nhân GPU, cung cấp mức hiệu năng vượt trội, giúp xử lý nhanh chóng các tác vụ nặng. Màn hình Super Retina XDR 6.1 inch trên máy cũng được đánh giá cao khi mang tới hình ảnh sắc nét với độ sáng cao, tối ưu hóa trải nghiệm xem nội dung dưới mọi điều kiện ánh sáng. Chưa hết, iPhone13 còn sở hữu hệ thống camera kép 12MP với công nghệ ổn định hình ảnh quang học (OIS) cải thiện khả năng quay film, chụp hình, ngay cả khi đang ở trong môi trường ánh sáng yếu.
                        </p>
                    </div>
                </div>
                <div className='flex-1'>
                    <h1 className='font-bold text-3xl mb-1'>Mua {product.name}</h1>
                    <p className='font-semibold text-xl text-blue-600'><span className="mr-[2px]">₫</span>{formatVND(product.price_sale)}</p>
                    <p className='font-semibold text-md line-through text-gray-400'><span className="mr-[2px]">₫</span>{formatVND(product.price)}</p>
                    <div className='mt-4'>
                        <h2 className='font-semibold text-2xl'>Dung lượng lưu trữ. <span className='text-gray-500'>Bạn cần bao nhiêu dung lượng?</span></h2>
                        <div className='mt-4'>
                            <Select onValueChange={setSelectedStorage}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn dung lượng" />
                                </SelectTrigger>
                                <SelectContent>
                                    {product.storage.map((storage) => (
                                        <SelectItem key={storage} value={storage}>
                                            {storage}GB
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h2 className='font-semibold text-2xl'>Màu. <span className='text-gray-500'>Chọn màu bạn yêu thích.</span></h2>
                        <div className="flex gap-3 mt-4">
                            {product.colors.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition
          ${selectedColor === color.name ? 'border-primary ring-2 ring-primary' : 'border-gray-300'}
        `}
                                    style={{ backgroundColor: color.css_code }}
                                    aria-label={color.name}
                                />
                            ))}

                        </div>
                    </div>

                    <div className='mt-6'>
                        <h2 className='font-semibold text-2xl'>Số lượng</h2>
                        <div className='flex gap-4 mt-2 items-center'>
                            <Button variant='outline' onClick={() => handleQuantityChange("decrease")} disabled={quantity === 1}><Minus /></Button>
                            <span>{quantity}</span>
                            <Button variant='outline' onClick={() => handleQuantityChange("increase")}><Plus /></Button>
                        </div>
                    </div>

                    <div className='mt-10 w-full'>
                        <Button variant='outline' className='w-full' disabled={!selectedColor || !selectedStorage} onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                    </div>
                </div>
            </div>

            <div>
                <h2 className='font-semibold text-2xl mt-10 text-center'>Sản phẩm liên quan</h2>
                <div className='mt-5'>
                    <ProductGrid products={relatedProducts} />
                </div>
            </div>
        </div>
    );
}
