import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import CustomerCard from "./components/CustomerCard";
import ReservationCard from "./components/ReservationCard";
import { addReservation, reservationsSlice } from "./features/reservationSlice";

function App() {
  const initialFormData = {
    tableNum: "1",
    time: "10:00",
    name: "",
    tel: "",
  };
  const [reservationForm, setReservationForm] = useState(initialFormData);
  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  );
  const customers = useSelector((state: RootState) => state.customers.value);
  const dispatch = useDispatch();

  const getTimes = () => {
    let times: string[] = [];
    for (let i = 10; i < 22; i++) {
      times.push(`${i}:00`, `${i}:30`);
    }
    return times;
  };
  const times = getTimes();

  const handleAddReservations = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addReservation(reservationForm));
    setReservationForm(initialFormData);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setReservationForm((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((reservation, index) => (
                <ReservationCard
                  key={reservation.name}
                  name={reservation.name}
                  index={index}
                  tableNum={reservation.tableNum}
                  time={reservation.time}
                />
              ))}
            </div>
          </div>
          <div className="reservation-input-container">
            <form onSubmit={handleAddReservations}>
              <label>
                Table No.
                <input
                  type="number"
                  name="tableNum"
                  value={reservationForm.tableNum || 1}
                  onChange={handleChange}
                  min="1"
                  max="15"
                />
              </label>
              <label>
                Time
                <select
                  value={reservationForm.time}
                  onChange={handleChange}
                  name="time"
                >
                  {times.map((time) => (
                    <option value={time} key={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={reservationForm.name || ""}
                  onChange={handleChange}
                />
              </label>
              <label>Tel.</label>
              <input
                type="tel"
                name="tel"
                value={reservationForm.tel || ""}
                onChange={handleChange}
              />

              <input
                className="add-button"
                type="submit"
                value="Add reservation"
              />
            </form>
          </div>
        </div>
        <div className="customer-food-container">
          <h5 className="header ">Customer orders</h5>
          {customers.map((customer, index) => (
            <CustomerCard
              key={index}
              index={index}
              id={customer.id}
              tableNum={customer.tableNum}
              time={customer.time}
              name={customer.name}
              food={customer.food}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
