import LoadingBtn from "@/components/common/Loading/LoadingBtn";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function GuestRoute({ children }) {
    const { user, isFetched } = useSelector((state) => state.auth)
    const location = useLocation()

    if (!isFetched) return <LoadingBtn />

    if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
        if (user.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />
        } else {
            return <Navigate to="/" replace />
        }
    }
    return children
}