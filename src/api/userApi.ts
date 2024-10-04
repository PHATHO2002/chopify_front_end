import axios from 'axios';
import { ApiResponse } from '../models/apiResponseModel';

const API_URL = import.meta.env.VITE_BACK_END_API_URL;
export const register = async (userData: { userName: string; password: string; avatar: File | null }) => {
    try {
        // Tạo một đối tượng FormData để chứa dữ liệu gửi lên server
        const formData = new FormData();
        formData.append('userName', userData.userName);
        formData.append('password', userData.password);

        // Kiểm tra xem người dùng có chọn file ảnh hay không
        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        // Gửi yêu cầu POST với FormData qua Axios
        const { data }: { data: ApiResponse } = await axios.post(`${API_URL}/user/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Đặt tiêu đề là multipart/form-data để gửi file
            },
        });

        return data; // Trả về kết quả từ server
    } catch (error) {

        throw error; // Ném lỗi để xử lý sau này (ví dụ trong component React)
    }
};
