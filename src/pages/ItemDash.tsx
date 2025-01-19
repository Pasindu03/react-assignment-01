import {useSelector} from "react-redux";
import SearchBar from "../components/SerchBar.tsx";
import {useState} from "react";
import {Item} from "../models/Item.ts";
import AddItemModal from "../components/AddItem.tsx";
import UpdateItemModal from "../components/UpdateItem.tsx";

export function ItemDash(){
    const items = useSelector(state => state.item.items);
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

    const [selectedItem,setSelectedItem] = useState<Item|null>(null);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch=()=>{
        console.log(searchTerm);
    };
    const showAddItem=()=>{
        setAddModalOpen(true);

    }
    const showUpdateItem=(item:Item)=>{
        setSelectedItem(item);
        setUpdateModalOpen(true);

    }


    return (
        <>
        <div className="flex flex-col items-center">
        <h1 className="p-5 text-4xl font-light mb-2 text-gray-900">Item</h1>
        </div>
    <div>
        <SearchBar handleSearch={handleSearch} setSearchTerm={setSearchTerm} handleModal1={showAddItem}/>
    </div>
    <table className="table-auto border-2 border-sky-400 w-full">
        <thead className="bg-sky-200">
        <tr>
            <td>Book Name</td>
            <td>Author</td>
            <td>QTO</td>
            <td>Price</td>
        </tr>
        </thead>
        <tbody>
        {
            items.map((item:Item) => (
                <tr key={item.itemCode} onClick={() => showUpdateItem(item)}>
                    <td>{item.desc}</td>
                    <td>{item.author}</td>
                    <td>{item.qto}</td>
                    <td>{item.price}</td>
                </tr>
            ))
        }
        </tbody>
    </table>
            <AddItemModal isOpen={isAddModalOpen} onClose={()=>setAddModalOpen(false)}/>
            <UpdateItemModal isOpen={isUpdateModalOpen}
                             onClose={()=>setUpdateModalOpen(false)}
                             selectedItem={selectedItem}/>
        </>
    )
}