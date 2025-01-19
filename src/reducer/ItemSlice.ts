import {createSlice} from "@reduxjs/toolkit";
import {Item} from "../models/Item.ts";


const initialState = {
    items: [],
}
const ItemSlice = createSlice({
    name:"Item",
    initialState:initialState,
    reducers:{
        addItem:(state, {payload}) => {
            state.items.push(payload);
        },
        deleteItem:(state, {payload}) => {
            state.items = state.items.filter((item:Item) => item.itemCode !== payload.itemCode);
        },
        updateItem:(state,{payload}) => {
            state.items = state.items.map((item:Item)=>(item.itemCode === payload.itemCode)?
                {...item,
                    itemCode:payload.itemCode,
                    desc:payload.desc,
                    author:payload.author,
                    qto:payload.qto,
                    price:payload.price}:item
            );
        }
    }
})
export const {addItem, deleteItem, updateItem} = ItemSlice.actions;
export default ItemSlice.reducer;