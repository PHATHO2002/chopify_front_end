import axios from 'axios';
import { ApiResponse } from '../models/apiResponseModel';

const API_URL = import.meta.env.VITE_BACK_END_API_URL;
const getAccessToken = () => localStorage.getItem('accessToken');

export const addProduct = async (productData: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    brand: string;
    image?: File;
}) => {
    try {
        // Tạo một đối tượng FormData để chứa dữ liệu gửi lên server
        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('description', productData.description);
        formData.append('category', productData.category);
        formData.append('price', productData.price.toString());
        formData.append('stock', productData.stock.toString());
        formData.append('brand', productData.brand);
        // Kiểm tra xem người dùng có chọn file ảnh hay không
        if (productData.image) {
            formData.append('image', productData.image);
        }


        // Gửi yêu cầu POST với FormData qua Axios
        const { data }: { data: ApiResponse } = await axios.post(`${API_URL}/admin/add-product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Đặt tiêu đề là multipart/form-data để gửi file
                'Authorization': `Bearer ${getAccessToken()}`,
            },
        });

        return data; // Trả về kết quả từ server
    } catch (error) {
        throw error; // Ném lỗi để xử lý sau này (ví dụ trong component React)
    }
};
