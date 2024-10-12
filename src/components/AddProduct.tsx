import React, { useState } from 'react';
import { addProduct, refreshAccessToken } from '../api';
import axios from 'axios';

interface Product {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    brand: string;
    image?: File; // File của hình ảnh
}

const categories = ['Beauty', 'Electronics', 'Fashion', 'Home', 'Sports'];

const AddProduct: React.FC = () => {
    const [newProduct, setNewProduct] = useState<Product>({
        title: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        brand: '',
        image: undefined // Đặt là `undefined` thay vì `null`
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // State để theo dõi trạng thái loading

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (e.target.type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0];
            setNewProduct({ ...newProduct, image: file });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null); // Reset thông báo thành công trước khi gửi
        setErrorMessage(null); // Reset thông báo lỗi trước khi gửi
        setLoading(true); // Bắt đầu loading
        try {
            await addProduct(newProduct);
            setSuccessMessage("Sản phẩm đã được thêm thành công!");
            // Reset form after submission
            setNewProduct({
                title: '',
                description: '',
                category: '',
                price: 0,
                stock: 0,
                brand: '',
                image: undefined,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    try {
                        const newAccessToken = await refreshAccessToken();
                        localStorage.setItem('accessToken', newAccessToken);
                        await addProduct(newProduct);
                        setSuccessMessage("Sản phẩm đã được thêm thành công!");
                        // Reset form after submission
                        setNewProduct({
                            title: '',
                            description: '',
                            category: '',
                            price: 0,
                            stock: 0,
                            brand: '',
                            image: undefined,
                        });
                    } catch (error) {
                        setErrorMessage("Lỗi khi làm mới token. Vui lòng thử lại.");
                    }
                } else {
                    setErrorMessage("Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.");
                }
            } else {
                setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm Mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Tên sản phẩm:</label>
                    <input
                        type="text"
                        name="title"
                        value={newProduct.title}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mô tả:</label>
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Loại hàng:</label>
                    <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    >
                        <option value="" disabled>Chọn thể loại</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Giá:</label>
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Số lượng trong kho:</label>
                    <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Nhãn hiệu:</label>
                    <input
                        type="text"
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Chọn Hình ảnh:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        accept="image/*"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    disabled={loading} // Disable button khi đang loading
                >
                    {loading ? "Đang thêm..." : "Thêm Sản Phẩm"}
                </button>

                {loading && <div className="mt-2 text-gray-600">Vui lòng chờ...</div>} {/* Hiển thị thông báo loading */}
            </form>
        </div>
    );
};

export default AddProduct;
