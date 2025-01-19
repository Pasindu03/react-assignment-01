import React, { useEffect, useState } from "react";
import SearchOrder from "../components/SearchOrder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../models/Item.ts";
import AddToCart from "../components/AddToCart.tsx";
import { CartItem } from "../models/CartItem.ts";
import UpdateCart from "../components/UpdateCart.tsx";
import { v4 } from "uuid";
import { Order } from "../models/Order.ts";
import { clearCart } from "../reducer/OrderDetailSlice.ts";
import { Customer } from "../models/Customer.ts";
import { addOrder } from "../reducer/OrderSlice.ts";
import { useNavigate } from "react-router";

export function OrderDetailsDash() {
    const items = useSelector((state) => state.item.items);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const customerList = useSelector((state) => state.customer.customers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [total, setTotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [cash, setCash] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const [clickedItem, setClickedItem] = useState<CartItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [order, setOrder] = useState<Order>({});

    useEffect(() => {
        setOrderId(`OID-${v4()}`);
    }, []);

    useEffect(() => {
        const discountAmount = total * (discount / 100);
        const calculatedSubTotal = total - discountAmount;
        setSubTotal(calculatedSubTotal);
        setBalance(cash - calculatedSubTotal);
    }, [total, discount, cash]);

    const handleBuy = () => {
        if (order) {
            order.orderId = orderId;
            order.date = orderDate;
            order.customerName = customerName;
            order.customerId = customerId;
            order.total = total;
            order.discount = discount;
            order.subtotal = subTotal;
        }
        dispatch(addOrder(order));
        navigate("/orders");
    };

    const handleFinish = () => {
        order.cartItems = cartItems;
        let cartTotal = 0;
        cartItems.forEach((item: CartItem) => {
            cartTotal += item.subTotal;
        });
        setTotal(cartTotal);
        dispatch(clearCart());
    };

    const handleSearch = () => {
        const suggested = items.filter((item: Item) =>
            item.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(suggested);
        setIsModalOpen(true);
    };

    const handleItemModify = (item: CartItem) => {
        setClickedItem(item);
        setIsUpdateOpen(true);
    };

    const handleCustomerSelect = (customer: Customer) => {
        setCustomerId(customer.id);
        setCustomerName(customer.name);
        setShowSuggestions(false);
    };

    return (
        <div className="flex flex-col lg:flex-row p-6 bg-gray-50 min-h-screen">
            {/* Order Form */}
            <div className="lg:w-1/3 bg-white shadow-lg rounded-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">New Order</h1>
                <form className="space-y-4">
                    <InputField label="Order ID" value={orderId} readOnly />
                    <InputField label="Customer ID" value={customerId} readOnly />
                    <InputField
                        label="Date"
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                    />
                    <div>
                        <label className="block text-sm font-medium mb-1">Customer Name</label>
                        <input
                            type="text"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={customerName}
                            onChange={(e) => {
                                setCustomerName(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {showSuggestions && (
                            <SuggestionList
                                items={customerList}
                                onSelect={handleCustomerSelect}
                            />
                        )}
                    </div>
                    <InputField
                        label="Total"
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(Number(e.target.value))}
                    />
                    <InputField
                        label="Discount %"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                    <InputField label="Sub Total" value={subTotal} readOnly />
                    <InputField
                        label="Cash"
                        type="number"
                        value={cash}
                        onChange={(e) => setCash(Number(e.target.value))}
                    />
                    <InputField label="Balance" value={balance} readOnly />
                    <button
                        type="button"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
                        onClick={handleBuy}
                    >
                        Buy
                    </button>
                </form>
            </div>

            {/* Item List */}
            <div className="lg:w-2/3 mt-6 lg:mt-0 lg:ml-6">
                <SearchOrder setSearchTerm={setSearchTerm} handleSearch={handleSearch}>
                    Add Item
                </SearchOrder>
                <h2 className="text-2xl font-bold text-center mb-6">Item List</h2>
                <table className="w-full border-collapse border border-gray-300 shadow rounded-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#Item Code</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                        <th className="border border-gray-300 px-4 py-2">Qty</th>
                        <th className="border border-gray-300 px-4 py-2">Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item: CartItem) => (
                        <tr
                            key={item.itemCode}
                            className="hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => handleItemModify(item)}
                        >
                            <td className="border border-gray-300 px-4 py-2">{item.itemCode}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.desc}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.unitPrice}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.subTotal}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600"
                        onClick={handleFinish}
                    >
                        Finished
                    </button>
                </div>
            </div>

            <AddToCart isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} suggestions={suggestions} />
            <UpdateCart isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} clickedItem={clickedItem} />
        </div>
    );
}

const InputField = ({ label, type = "text", value, onChange, readOnly }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            type={type}
            className={`block w-full border-gray-300 rounded-md shadow-sm ${
                readOnly ? "bg-gray-100" : "focus:ring-indigo-500 focus:border-indigo-500"
            }`}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
        />
    </div>
);

const SuggestionList = ({ items, onSelect }) => (
    <ul className="border border-gray-300 rounded-md mt-2 bg-white max-h-32 overflow-y-auto">
        {items.map((item) => (
            <li
                key={item.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => onSelect(item)}
            >
                {item.name}
            </li>
        ))}
    </ul>
);
