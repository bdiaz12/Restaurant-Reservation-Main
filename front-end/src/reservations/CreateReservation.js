import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../reservations/ReservationForm"; // Import the ReservationForm component

function CreateReservation() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [reservationError, setReservationError] = useState(false);

  const textChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const numberChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(formData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
    return () => abortController.abort();
  };

  return (
    <>
      <h2>New Reservation</h2>
      <ErrorAlert error={reservationError} />
      {/* Pass all props to ReservationForm component */}
      <ReservationForm
        formData={formData}
        textChangeHandler={textChangeHandler}
        numberChangeHandler={numberChangeHandler}
        handleSubmit={handleSubmit}
        history={history}
      />
    </>
  );
}

export default CreateReservation;
