import React, { useState } from "react";
import { Item } from "../models/Item.ts";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducer/OrderDetailSlice.ts";

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    suggestions: Item[];
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, suggestions }) => {
    const dispatch = useDispatch();

    const [itemCode, setItemCode] = useState("");
    const [desc, setDesc] = useState("");
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [qty, setQty] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleItemSelect = (item: Item) => {
        setItemCode(item.itemCode);
        setDesc(item.desc);
        setUnitPrice(item.price);
        setQty(1);
        setSubTotal(item.price);
        setShowSuggestions(false);
    };

    const handleQuantityChange = (value: string) => {
        const qty = Number(value);
        setQty(qty);
        setSubTotal(qty * unitPrice);
    };

    const handleAddToCart = () => {
        const cartItem = {
            itemCode,
            desc,
            unitPrice,
            qty,
            subTotal,
        };

        dispatch(addToCart(cartItem));
        clearForm();
        onClose();
    };

    const clearForm = () => {
        setItemCode("");
        setDesc("");
        setUnitPrice(0);
        setQty(0);
        setSubTotal(0);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Item to Order</h1>
                <form className="space-y-4">
                    {/* Item Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item ID</label>
                        <input
                            type="text"
                            value={itemCode}
                            readOnly
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Item Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Description</label>
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => {
                                setDesc(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="Enter item description"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="mt-2 border border-gray-300 rounded-md bg-white max-h-32 overflow-y-auto shadow-md">
                                {suggestions.map((item) => (
                                    <li
                                        key={item.itemCode}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleItemSelect(item)}
                                    >
                                        {item.desc}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Unit Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                        <input
                            type="number"
                            value={unitPrice}
                            readOnly
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={qty}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            placeholder="Enter quantity"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Subtotal */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sub Total</label>
                        <input
                            type="number"
                            value={subTotal}
                            readOnly
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        type="button"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </form>

                {/* Close Button */}
                <button
                    type="button"
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={() => {
                        clearForm();
                        onClose();
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddItemModal;
