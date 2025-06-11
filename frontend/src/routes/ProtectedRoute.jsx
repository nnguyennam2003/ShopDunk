import LoadingBtn from "@/components/common/Loading/LoadingBtn";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user, isFetched } = useSelector((state) => state.auth)

    if (!isFetched) return <LoadingBtn />

    if (!user) return <Navigate to="/login" replace />
    return children
}