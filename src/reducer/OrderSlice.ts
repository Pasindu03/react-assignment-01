import {createSlice} from "@reduxjs/toolkit";
import {Order} from "../models/Order.ts";

const initalstste={
    orders : []
}
const OrderSlice = createSlice({
    name:'orders',
    initialState:initalstste,
    reducers:{
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter((order:Order) => order.orderId !== action.payload.orderId);
        }
    }
})
export const {addOrder, deleteOrder} = OrderSlice.actions;
export default OrderSlice.reducer;