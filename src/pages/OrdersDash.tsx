
import {useState} from "react";
import SearchOrder from "../components/SearchOrder.tsx";
import {useDispatch, useSelector} from "react-redux";
import {Order} from "../models/Order.ts";
import {deleteOrder} from "../reducer/OrderSlice.ts";

export function OrdersDash(){
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = ()=>{
        //TODO: Handle search
    }
    const handleOrder = (order:Order)=>{
        const isConfirmed = window.confirm(`Do you want to delete this order? ${order.orderId}`);
        if(isConfirmed){
            dispatch(deleteOrder(order));
        }
    }
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="p-5 text-4xl font-light mb-2 text-gray-900">Orders</h1>
            </div>
            <div>
                <SearchOrder handleSearch={handleSearch} setSearchTerm={setSearchTerm}>Search</SearchOrder>
            </div>
            <table className="table-auto border-2 border-sky-400 w-full">
                <thead className="bg-sky-200">
                <tr>
                    <td>OrderId</td>
                    <td>CustomerName</td>
                    <td>Date</td>
                    <td>Total</td>
                    <td>Discount</td>
                    <td>Subtotal</td>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order: Order) => (
                        <tr key={order.orderId} onClick={() => handleOrder(order)}>
                            <td>{order.orderId}</td>
                            <td>{order.customerName}</td>
                            <td>{order.date}</td>
                            <td>{order.total}</td>
                            <td>{order.discount}</td>
                            <td>{order.subtotal}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}