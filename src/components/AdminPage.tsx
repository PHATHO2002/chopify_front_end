import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const Admin: React.FC = () => {
    // Danh sách chức năng với các subitem và link
    const functionsWithSubitems = [
        {
            name: "Quản lý sản phẩm",
            subItems: [
                { name: "Thêm sản phẩm", link: "/admin/add-product" },
                { name: "Chỉnh sửa sản phẩm", link: "/admin/edit-product" },
                { name: "Xóa sản phẩm", link: "/admin/delete-product" }
            ]
        },
        {
            name: "Quản lý người dùng",
            subItems: [
                { name: "Thêm người dùng", link: "/admin/add-user" },
                { name: "Chỉnh sửa thông tin người dùng", link: "/admin/edit-user" },
                { name: "Xóa người dùng", link: "/admin/delete-user" }
            ]
        },
        {
            name: "Thống kê doanh thu",
            subItems: [
                { name: "Xem doanh thu theo tháng", link: "/admin/revenue-month" },
                { name: "Xem doanh thu theo quý", link: "/admin/revenue-quarter" },
                { name: "Xem doanh thu theo năm", link: "/admin/revenue-year" }
            ]
        }
    ];

    // State theo dõi mục nào đang được mở
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Hàm để toggle trạng thái mở/đóng của mục
    const toggleSubItems = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Dashboard</h1>

            {/* Danh sách chức năng với subitem */}
            <div className="mb-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Chức Năng</h2>
                <ul className="bg-white rounded-lg shadow-lg p-4">
                    {functionsWithSubitems.map((functionItem, index) => (
                        <li key={index} className="mb-4">
                            {/* Mục chính, nhấn vào để toggle */}
                            <div
                                onClick={() => toggleSubItems(index)}
                                className="p-2 border-b last:border-0 hover:bg-blue-100 transition duration-300 rounded font-medium text-gray-800 cursor-pointer"
                            >
                                {functionItem.name}
                            </div>

                            {/* Subitems, chỉ hiện khi mục chính được mở */}
                            {openIndex === index && (
                                <ul className="ml-4 mt-2">
                                    {functionItem.subItems.map((subItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className="p-2 mb-2 border-l-2 border-blue-500 hover:bg-blue-50 transition duration-300 rounded"
                                        >
                                            {/* Gắn link cho subItem */}
                                            <Link to={subItem.link} className="text-blue-600 hover:underline">
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
