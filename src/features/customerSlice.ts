import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CustomerState {
    value: Customer[];
}

interface Customer {
    time: string;
    id: string;
    tableNum: string;
    name: string;
    food: string[];
}
interface AddFoodCustomerPayload {
    food: string;
    id: string;
}
const initialState: CustomerState = {
    value: []
}

export const  customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.value.push(action.payload);
        },
        removeCustomer: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        },
        addFoodToCustomer: (state, action:  PayloadAction<AddFoodCustomerPayload>) => {
            state.value.forEach((customer => {
                if(customer.id === action.payload.id) {
                    customer.food.push(action.payload.food);

                }
            }))
      
        }
    },
})

export const {addCustomer, addFoodToCustomer, removeCustomer} =  customersSlice.actions;
export default  customersSlice.reducer;