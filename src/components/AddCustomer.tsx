import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../reducer/CustomerSlice.ts";
import { v4 } from "uuid";

interface AddCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = `CID-${v4()}`;
        const customer = { id, name, address, phone };
        dispatch(addCustomer(customer));
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter customer name"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Address Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter customer address"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Phone Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter customer phone"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            onChange={(e) => setPhone(e.target.value)}
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

export default AddCustomerModal;
