import { formatVND } from '@/helpers/FormatDataNumber';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductItem({ product }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/productDetail/${product.id}`)
    }

    return (
        <div onClick={handleClick} className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer p-6 transition flex flex-col h-full">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full object-cover mb-3 rounded-tl-2xl rounded-tr-2xl"
            />
            <h3 className="font-semibold text-2xl my-3">{product.name}</h3>
            <div className="mt-auto">
                <p className="font-semibold text-lg text-blue-600">{formatVND(product.price_sale)}₫</p>
                <p className="text-gray-500 text-sm line-through">{formatVND(product.price)}₫</p>
            </div>
        </div>
    );
}
