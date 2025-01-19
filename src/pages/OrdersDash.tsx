import { useState } from "react";
import SearchOrder from "../components/SearchOrder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "../models/Order.ts";
import { deleteOrder } from "../reducer/OrderSlice.ts";

export function OrdersDash() {
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        // TODO: Implement search logic
        console.log(`Searching for: ${searchTerm}`);
    };

    const handleDeleteOrder = (order: Order) => {
        const isConfirmed = window.confirm(`Do you want to delete this order? ${order.orderId}`);
        if (isConfirmed) {
            dispatch(deleteOrder(order));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold text-gray-800 mb-6">Orders Dashboard</h1>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <SearchOrder handleSearch={handleSearch} setSearchTerm={setSearchTerm}>
                    Search
                </SearchOrder>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-sky-600 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">Customer Name</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Total</th>
                        <th className="px-4 py-2 text-left">Discount</th>
                        <th className="px-4 py-2 text-left">Subtotal</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order: Order) => (
                        <tr key={order.orderId} className="hover:bg-gray-100 transition">
                            <td className="px-4 py-2">{order.orderId}</td>
                            <td className="px-4 py-2">{order.customerName}</td>
                            <td className="px-4 py-2">{order.date}</td>
                            <td className="px-4 py-2">{order.total}</td>
                            <td className="px-4 py-2">{order.discount}</td>
                            <td className="px-4 py-2">{order.subtotal}</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                                    onClick={() => handleDeleteOrder(order)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
