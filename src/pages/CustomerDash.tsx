import { useSelector } from "react-redux";
import { Customer } from "../models/Customer.ts";
import SearchBar from "../components/SerchBar.tsx";
import { useState } from "react";
import AddCustomerModal from "../components/AddCustomer.tsx";
import UpdateCustomerModal from "../components/UpdateCustomer.tsx";

export function CustomerDash() {
    const customers = useSelector((state) => state.customer.customers);

    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearch() {
        console.log(searchTerm);
    }

    function showAddCustomer() {
        setAddModalOpen(true);
    }

    function showUpdateCustomer(customer: Customer) {
        setSelectedCustomer(customer);
        setUpdateModalOpen(true);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold text-gray-800 mb-6">Customer Dashboard</h1>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <SearchBar handleSearch={handleSearch} setSearchTerm={setSearchTerm} handleModal1={showAddCustomer} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-sky-600 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Address</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer: Customer) => (
                        <tr
                            key={customer.id}
                            className="hover:bg-gray-100 cursor-pointer transition"
                            onClick={() => showUpdateCustomer(customer)}
                        >
                            <td className="px-4 py-2">{customer.name}</td>
                            <td className="px-4 py-2">{customer.address}</td>
                            <td className="px-4 py-2">{customer.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            <UpdateCustomerModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedCustomer={selectedCustomer}
            />
        </div>
    );
}
