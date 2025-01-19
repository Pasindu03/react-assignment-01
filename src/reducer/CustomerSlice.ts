import { createSlice} from '@reduxjs/toolkit';
import {Customer} from "../models/Customer.ts";

const initialState = {
    customers: [] ,
}

const CustomerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        addCustomer: (state, {payload}) => {
            state.customers.push(payload);
        },
        deleteCustomer: (state, {payload}) => {
            state.customers = state.customers.filter((customer:Customer) => customer.id !== payload.id);
        },
        updateCustomer: (state, action) => {
            state.customers = state.customers.map((customer:Customer) =>
                customer.id === action.payload.id ?
                    {...customer, id: action.payload.id,
                        name: action.payload.name,
                        address: action.payload.address,
                        phone: action.payload.phone}
                    :customer
            )
        }
    },
});

export const { addCustomer,deleteCustomer,updateCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;