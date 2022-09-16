import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ReservationState {
    value:  Reservation[],
}
interface Reservation {
    tableNum: string,
    time: string,
    name: string,
    tel: string,
}
const initialState: ReservationState = {
    value: []
}

export const  reservationsSlice = createSlice({
    name: "reservations",
    initialState,
    reducers: {
        addReservation: (state, action: PayloadAction<Reservation>) => {
            state.value.push(action.payload);
        },
        replaceReservation: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        }
    }
})

export const { addReservation, replaceReservation} = reservationsSlice.actions;
export default reservationsSlice.reducer;