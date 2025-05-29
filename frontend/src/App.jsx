import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "@/pages/Signup"
import AdminLayout from "@/admin/AdminLayout"
import Dashboard from "@/admin/Dashboard"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getMe } from "@/store/slices/authSlice"
import AdminProtectedRoute from "@/routes/AdminProtectRoute"
import { Toaster } from "sonner"
import UserManage from "@/admin/UserManage"
import ProductManage from "@/admin/ProductManage"
import CategoryManage from "@/admin/CategoryManage"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin layout routes */}
        <Route
          path="/admin"
          element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManage />} />
          <Route path="products" element={<ProductManage />} />
          <Route path="categories" element={<CategoryManage />} />
        </Route>
      </Routes>

      <Toaster position="bottom-left" />
    </>
  )
}

export default App
