import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

const initialFormState = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function CreateReservation() {
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservationError, setReservationError] = useState(null);

  const textChangeHandler = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createReservation(formData);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
  };

  return (
    <>
      <h2>New Reservation</h2>
      <ErrorAlert error={reservationError} />
      <ReservationForm
        formData={formData}
        textChangeHandler={textChangeHandler}
        handleSubmit={handleSubmit}
        history={history}
      />
    </>
  );
}

export default CreateReservation;
