import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm() {
  const history = useHistory();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [reservationError, setReservationError] = useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "people") {
      value = Number(value);
    }
    setReservation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
    return () => abortController.abort();
  };

  return (
    <>
      <h2>New Reservation</h2>
      <ErrorAlert error={reservationError} />

      <form onSubmit={handleSubmit}>
        {/* Input fields */}
      </form>
    </>
  );
}

export default ReservationForm;

