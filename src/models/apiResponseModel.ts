export interface ApiResponse {
    errCode: number; // Mã lỗi, kiểu số
    message: string; // Thông điệp, kiểu chuỗi
    data: any | null; // Dữ liệu trả về, có thể là kiểu bất kỳ hoặc null
}