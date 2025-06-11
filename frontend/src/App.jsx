import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "@/pages/Signup"
import AdminLayout from "@/admin/AdminLayout"
import Dashboard from "@/admin/Dashboard"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "@/store/slices/authSlice"
import AdminProtectedRoute from "@/routes/AdminProtectRoute"
import { Toaster } from "sonner"
import UserManage from "@/admin/UserManage"
import ProductManage from "@/admin/ProductManage"
import CategoryManage from "@/admin/CategoryManage"
import MainLayout from "@/layout/MainLayout"
import AuthLayout from "@/layout/AuthLayout"
import Profile from "@/pages/Profile"
import ProtectedRoute from "@/routes/ProtectedRoute"
import GuestRoute from "@/routes/GuestRoute"
import PageNotFound from "@/routes/PageNotFound"
import Checkout from "@/pages/Checkout"
import ProductDetail from "@/pages/ProductDetail"
import CategoryProducts from "@/pages/CategoryProducts"
import { getListCart } from "@/store/slices/cartSlice"
import CheckoutSuccess from "@/pages/CheckoutSuccess"
import Orders from "@/pages/Orders"
import OrderDetail from "@/pages/OrderDetail"
import ColorManage from "@/admin/ColorMange"
import Contact from "@/pages/Contact"

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (user && user.id) {
      dispatch(getListCart());
    }
  }, [user, dispatch]);

  return (
    <div className="font-roboto">
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected auth routes */}
          <Route path="/checkout-success" element={<ProtectedRoute><CheckoutSuccess /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        </Route>

        {/* Auth layout routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        </Route>

        {/* Admin layout routes */}
        <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManage />} />
          <Route path="products" element={<ProductManage />} />
          <Route path="categories" element={<CategoryManage />} />
          <Route path="colors" element={<ColorManage />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  )
}

export default App
