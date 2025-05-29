import LoadingBtn from "@/components/common/LoadingBtn/LoadingBtn"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function AdminProtectedRoute({ children }) {
    const { user, isFetched } = useSelector((state) => state.auth)

    if (!isFetched) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingBtn className="animate-spin" />
            </div>
        )
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />
    }

    return children
}
