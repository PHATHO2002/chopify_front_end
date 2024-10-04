import axios from 'axios';
import { ApiResponse } from '../models/apiResponseModel';
const API_URL = import.meta.env.VITE_BACK_END_API_URL;
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

export const refreshAccessToken = async () => {
    try {

        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');
        const { data }: any = await axios.post(`${API_URL}/refreshToken`, {
            refreshToken,
        });
        let accessToken = data;

        localStorage.setItem('accessToken', accessToken);
        return accessToken;

    } catch (error) {
        throw error;
    }
}
export const login = async (userData: { userName: string; password: string; }) => {
    try {


        // Gửi yêu cầu POST với dữ liệu JSON qua Axios
        const { data }: { data: ApiResponse } = await axios.post(`${API_URL}/user/login`, userData, {
            headers: {
                'Content-Type': 'application/json', // Thêm header nếu gửi JSON
            },
        });

        return data; // Trả về kết quả từ server
    } catch (error) {

        throw error; // Ném lỗi để xử lý sau này (ví dụ trong component React)
    }
};

export const logout = async () => {
    try {


        // Gửi yêu cầu POST với dữ liệu JSON qua Axios
        const { data }: { data: ApiResponse } = await axios.delete(`${API_URL}/user/logout`, {
            headers: {
                'Content-Type': 'application/json', // Thêm header nếu gửi JSON
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            data: {
                refreshToken: getRefreshToken(), // Truyền accessToken vào body
            },
        });

        return data; // Trả về kết quả từ server
    } catch (error) {
        throw error; // Xử lý các lỗi khác nếu cần
    }
};
