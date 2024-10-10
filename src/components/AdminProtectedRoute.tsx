import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const AdminProtectedRoute: FC = () => {
    // Lấy thông tin về người dùng đã đăng nhập và quyền của họ
    const { isLoggedIn, userData } = useAppSelector((state) => state.authReducer);

    // Kiểm tra nếu người dùng đã đăng nhập và có quyền admin
    return isLoggedIn && userData?.role === 2 ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtectedRoute;
