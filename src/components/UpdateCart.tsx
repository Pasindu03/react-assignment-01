import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, updateCart } from "../reducer/OrderDetailSlice.ts";
import { CartItem } from "../models/CartItem.ts";

interface UpdateCartItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    clickedItem: CartItem | null;
}

const UpdateCart: React.FC<UpdateCartItemModalProps> = ({ isOpen, onClose, clickedItem }) => {
    const dispatch = useDispatch();

    const [itemCode, setItemCode] = useState("");
    const [desc, setDesc] = useState("");
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [qty, setQty] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);

    useEffect(() => {
        if (clickedItem) {
            setItemCode(clickedItem.itemCode);
            setDesc(clickedItem.desc);
            setUnitPrice(clickedItem.unitPrice);
            setQty(clickedItem.qty);
            setSubTotal(clickedItem.subTotal);
        }
    }, [clickedItem]);

    const handleQuantityChange = (value: string) => {
        const qty = Number(value);
        setQty(qty);
        setSubTotal(qty * unitPrice);
    };

    const handleUpdateCart = () => {
        const cartItem = {
            itemCode,
            desc,
            unitPrice,
            qty,
            subTotal,
        };

        dispatch(updateCart(cartItem));
        resetForm();
        onClose();
    };

    const handleDelete = () => {
        if (clickedItem) {
            dispatch(deleteFromCart(clickedItem));
        }
        onClose();
    };

    const resetForm = () => {
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update Cart Item</h1>
                <form className="space-y-4">
                    {/* Item ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item ID</label>
                        <input
                            type="text"
                            value={itemCode}
                            readOnly
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
                        />
                    </div>

                    {/* Item Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Description</label>
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Unit Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                        <input
                            type="number"
                            value={unitPrice}
                            readOnly
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={qty}
                            onChange={(e) => handleQuantityChange(e.target.value)}
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
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-4">
                        <button
                            type="button"
                            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                            onClick={handleUpdateCart}
                        >
                            Update Cart
                        </button>
                        <button
                            type="button"
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                            onClick={handleDelete}
                        >
                            Delete Item
                        </button>
                        <button
                            type="button"
                            className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCart;
