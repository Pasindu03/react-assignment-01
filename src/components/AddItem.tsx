import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addItem } from "../reducer/ItemSlice.ts";

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [itemDescription, setItemDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const itemCode = `IID-${v4()}`;
        const item = {
            itemCode,
            desc: itemDescription,
            author,
            qto: quantity,
            price,
        };
        dispatch(addItem(item));
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Book Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="bookName">
                            Book Name
                        </label>
                        <input
                            type="text"
                            id="bookName"
                            placeholder="Enter book name"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                    </div>

                    {/* Author Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="authorName">
                            Author Name
                        </label>
                        <input
                            type="text"
                            id="authorName"
                            placeholder="Enter author name"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            placeholder="Enter quantity"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Enter price"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
