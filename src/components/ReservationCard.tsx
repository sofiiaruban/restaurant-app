import { useDispatch } from "react-redux";
import { replaceReservation } from "../features/reservationSlice";
import {addCustomer} from "../features/customerSlice";
import {v4 as uuid} from "uuid";
import React from "react";

interface ReservationCardTypes{
    tableNum: string,
    time: string,
    name: string,
    index: number
}

export default function ReservationCard({tableNum,time, name, index}: ReservationCardTypes) { 

    const clickHandler = () => {
        dispatch(replaceReservation(index));
        dispatch(addCustomer({
            id: uuid(),
            tableNum,
            time,
            name,
            food: [] 
        }));
    }

    const dispatch = useDispatch();

    return (
        <div onClick={clickHandler} className="reservation-card-container">{`Table No.${tableNum} ${name} ${time}`} </div>
        
    )

}