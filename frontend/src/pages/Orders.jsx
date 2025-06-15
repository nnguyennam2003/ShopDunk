import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '@/store/slices/orderSlice'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { formatDateTimeVN, formatVND } from '@/helpers/FormatDataNumber'

export default function Orders() {
  useEffect(() => {
    document.title = 'Đơn hàng của bạn'
  }, [])

  const { orders } = useSelector(state => state.order)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  
  return (
    <div className='h-screen'>
      <h1 className='text-3xl font-bold mt-10'>Đơn hàng bạn đã đặt</h1>
      <div className='mt-5'>
        <Table className="w-full mt-2">
          <TableHeader className='text-lg'>
            <TableRow>
              <TableHead>
                Mã đơn
              </TableHead>
              <TableHead>
                Ngày đặt
              </TableHead>
              <TableHead>
                Tổng tiền
              </TableHead>
              <TableHead>
                Trạng thái
              </TableHead>
              <TableHead>
                Xem chi tiết
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              (Array.isArray(orders) ? orders : []).map((order) => (
                <TableRow key={order.id} className='text-lg'>
                  <TableCell className='py-10'>#{order.id}</TableCell>
                  <TableCell>{formatDateTimeVN(order.created_at)}</TableCell>
                  <TableCell>{formatVND(order.total_price)}đ</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className='w-20'>
                    <Button variant='default' size='sm' className='bg-blue-400 hover:bg-blue-600 cursor-pointer'
                      onClick={() => navigate(`/orders/${order.id}`)}
                    ><Info /></Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
