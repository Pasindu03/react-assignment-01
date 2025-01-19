import { useSelector } from "react-redux";
import SearchBar from "../components/SerchBar.tsx";
import { useState } from "react";
import { Item } from "../models/Item.ts";
import AddItemModal from "../components/AddItem.tsx";
import UpdateItemModal from "../components/UpdateItem.tsx";

export function ItemDash() {
    const items = useSelector((state) => state.item.items);
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        console.log(searchTerm);
    };

    const showAddItem = () => {
        setAddModalOpen(true);
    };

    const showUpdateItem = (item: Item) => {
        setSelectedItem(item);
        setUpdateModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold text-gray-800 mb-6">Item Dashboard</h1>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <SearchBar handleSearch={handleSearch} setSearchTerm={setSearchTerm} handleModal1={showAddItem} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-sky-600 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Book Name</th>
                        <th className="px-4 py-2 text-left">Author</th>
                        <th className="px-4 py-2 text-left">QTO</th>
                        <th className="px-4 py-2 text-left">Price</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item: Item) => (
                        <tr
                            key={item.itemCode}
                            className="hover:bg-gray-100 cursor-pointer transition"
                            onClick={() => showUpdateItem(item)}
                        >
                            <td className="px-4 py-2">{item.desc}</td>
                            <td className="px-4 py-2">{item.author}</td>
                            <td className="px-4 py-2">{item.qto}</td>
                            <td className="px-4 py-2">{item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddItemModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            <UpdateItemModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedItem={selectedItem}
            />
        </div>
    );
}
