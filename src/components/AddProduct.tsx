import React, { useState } from 'react';

interface Product {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    images: string;  // URL của hình ảnh
    thumbnail: string;
}

const categories = ['Beauty', 'Electronics', 'Fashion', 'Home', 'Sports']; // Danh sách các thể loại sản phẩm

const AddProduct: React.FC = () => {
    const [newProduct, setNewProduct] = useState<Product>({
        title: '',
        description: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        stock: 0,
        brand: '',
        images: '',
        thumbnail: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý logic thêm sản phẩm
        console.log(newProduct);
        setNewProduct({
            title: '',
            description: '',
            category: '',
            price: 0,
            discountPercentage: 0,
            stock: 0,
            brand: '',
            images: '',
            thumbnail: '',
        });
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
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
                    <label className="block text-gray-700">Phần trăm giảm giá:</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={newProduct.discountPercentage}
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
                    <label className="block text-gray-700">URL Hình ảnh:</label>
                    <input
                        type="text"
                        name="images"
                        value={newProduct.images}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Thumbnail:</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={newProduct.thumbnail}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Thêm Sản Phẩm
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
