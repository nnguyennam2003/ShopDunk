import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductGrid from "@/components/common/Product/ProductGrid" // hoặc component bạn dùng để hiển thị sản phẩm
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryProducts() {
    const { categoryName } = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/product?category=${categoryName}`)
            setProducts(res.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchProducts()
    }, [categoryName])

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl text-center font-bold mb-4 capitalize">{categoryName}</h1>
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center space-y-3">
                            <Skeleton className="h-[300px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    )
                    )}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center text-gray-500 py-10 h-[70vh]">Không có sản phẩm nào</div>
            ) : (
                <ProductGrid products={products} />
            )}
        </div>
    )
}