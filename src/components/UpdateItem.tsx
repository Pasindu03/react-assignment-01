import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Item } from "../models/Item.ts";
import { deleteItem, updateItem } from "../reducer/ItemSlice.ts";

interface UpdateItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedItem: Item | null;
}

const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ isOpen, onClose, selectedItem }) => {
    const dispatch = useDispatch();

    const [itemCode, setItemCode] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("");
    const [qto, setQto] = useState<number | undefined>();
    const [price, setPrice] = useState<number | undefined>();

    useEffect(() => {
        if (selectedItem) {
            setItemCode(selectedItem.itemCode);
            setDesc(selectedItem.desc);
            setAuthor(selectedItem.author);
            setQto(selectedItem.qto);
            setPrice(selectedItem.price);
        }
    }, [selectedItem]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedItem = {
            itemCode,
            desc,
            author,
            qto,
            price,
        };
        dispatch(updateItem(updatedItem));
        onClose();
    };

    const handleDelete = () => {
        if (selectedItem) {
            dispatch(deleteItem(selectedItem));
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Description Field */}
                    <div>
                        <label htmlFor="item-desc" className="block text-sm font-medium text-gray-700">
                            Item Description
                        </label>
                        <input
                            type="text"
                            id="item-desc"
                            value={desc}
                            placeholder="Enter item description"
                            onChange={(e) => setDesc(e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Author Field */}
                    <div>
                        <label htmlFor="item-author" className="block text-sm font-medium text-gray-700">
                            Author
                        </label>
                        <input
                            type="text"
                            id="item-author"
                            value={author}
                            placeholder="Enter author name"
                            onChange={(e) => setAuthor(e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Quantity Field */}
                    <div>
                        <label htmlFor="item-quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="item-quantity"
                            value={qto}
                            placeholder="Enter quantity"
                            onChange={(e) => setQto(Number(e.target.value))}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Price Field */}
                    <div>
                        <label htmlFor="item-price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            id="item-price"
                            value={price}
                            placeholder="Enter price"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
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
                            Update
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItemModal;
