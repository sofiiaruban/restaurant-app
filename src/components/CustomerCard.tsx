import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCustomer, removeCustomer } from "../features/customerSlice";
import { replaceReservation } from "../features/reservationSlice";

interface CustomerCardTypes {
    id: string,
    tableNum: string,
    time: string,
    name: string,
    food: string[],
    index: number
}

export default function CustomerCard({ id, time, tableNum, name, food, index}: CustomerCardTypes) { 

    const dispatch = useDispatch();
    const [customerFoodInput, setCustomerFoodInput] = useState("");

    const clickHandler = () => {
        dispatch(addFoodToCustomer({
            id, food: customerFoodInput
            }));
        setCustomerFoodInput('');
    }
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setCustomerFoodInput(e.target.value)
    }
    const deleteHandler = () => {
        dispatch(removeCustomer(index));
    }
    return ( 
    <div className="customer-food-card-container">
        <div className="customer-card-header">
            <p>{`Table No. ${tableNum} ${name} ${time}`}</p>
            <div className="customer-card-delete-container" onClick={deleteHandler}>&#10006;</div>
        </div>
        <div className="customer-foods-container">
        <div className="customer-food">
            {food?.map((food, id)=> <p key={id}>{food}</p>) }
        </div>
        
        <div className="customer-food-input-container">
        <input value={customerFoodInput} onChange={changeHandler}/>
        <button onClick={clickHandler}>Add</button>  
        </div>
        </div>
    </div>
  )

} 


