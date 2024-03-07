import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation, readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [reservationError, setReservationError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const loadReservation = async () => {
      try {
        const fetchedReservation = await readReservation(reservation_id, abortController.signal);
        setReservation(fetchedReservation);
      } catch (error) {
        setReservationError(error);
      }
    };

    loadReservation();

    return () => abortController.abort();
  }, [reservation_id]);

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
      await updateReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
    return () => abortController.abort();
  };

  return (
    <>
      <h2>Edit Reservation</h2>
      <ErrorAlert error={reservationError} />

      <form onSubmit={handleSubmit}>
        {/* Input fields */}
      </form>
    </>
  );
}

export default EditReservation;