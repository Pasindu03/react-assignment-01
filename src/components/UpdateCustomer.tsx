import React, { useEffect, useState } from "react";
import { Customer } from "../models/Customer.ts";
import { useDispatch } from "react-redux";
import { deleteCustomer, updateCustomer } from "../reducer/CustomerSlice.ts";

interface UpdateCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCustomer: Customer | null;
}

const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({ isOpen, onClose, selectedCustomer }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCustomer) {
            setId(selectedCustomer.id);
            setName(selectedCustomer.name);
            setPhone(selectedCustomer.phone);
            setAddress(selectedCustomer.address);
        }
    }, [selectedCustomer]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const customer = {
            id,
            name,
            address,
            phone,
        };
        dispatch(updateCustomer(customer));
        onClose();
    };

    const handleDelete = () => {
        if (selectedCustomer) {
            dispatch(deleteCustomer(selectedCustomer));
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="customer-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Address Field */}
                    <div>
                        <label htmlFor="customer-address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="customer-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="customer-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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

export default UpdateCustomerModal;
