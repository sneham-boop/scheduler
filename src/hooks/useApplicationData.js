import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: [],
    interviewers: [],
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // Book an interview and update state to reflect change
  const bookInterview = (id, interview) => {
    const appointments = [...state.appointments];
    const appointment = appointments.find((appt) => appt._id === id);
    appointment.interview = { ...interview };

    appointments.forEach((appt) => {
      if (appt._id === id) appt = appointment;
    });

    const saveAppointment = axios.put(`/api/appointments/${id}`, {
      interview,
    });

    return saveAppointment.then((response) => {
      response.status === 200 && getData();
    });
  };

  // Cancel an interview and update state to reflect change
  const cancelInterview = (id) => {
    const appointments = [...state.appointments];
    const appointment = appointments.find((appt) => appt._id === id);
    if (!appointment) return null;
    const deleteAppointment = axios.delete(`/api/appointments/${id}`);

    return deleteAppointment.then((response) => {
      response.status === 200 && getData();
    });
  };

  const getEmptySpots = (day_id, appointments) => {
    let spots = 0;
    appointments.map((appointment) => {
      const { interview } = appointment;
      if (appointment.day_id === day_id && interview.interviewer_id === null) {
        spots++;
      }
    });
    return spots;
  };

  const getData = async () => {
    const daysRequest = axios.get("/api/days");
    const appointmentsRequest = axios.get("/api/appointments");
    const interviewersRequest = axios.get("/api/interviewers");
    Promise.all([daysRequest, appointmentsRequest, interviewersRequest]).then(
      (all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;

        // Count spots per day:
        const daysWithSpots = days.map((day, i) => {
          const spots = getEmptySpots(day._id, appointments);
          return { ...day, spots };
        });
        setState((prev) => ({
          ...prev,
          days: daysWithSpots,
          appointments,
          interviewers,
        }));
      }
    );
  };

  // Load initial data from database to state
  useEffect(() => {
    getData();
  }, []);

  return { state, setDay, bookInterview, cancelInterview, getEmptySpots };
};

export default useApplicationData;
