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

  // Change number of spots when a new interview is booked
  // or an existing interview is deleted
  const updateSpots = () => {
    setState((prev) => {
      const { day, appointments, days } = { ...prev };
      let spots = 0;
      for (const d of days) {
        if (d.name === day) {
          for (const id of d.appointments) {
            appointments[id].interview === null && spots++;
            d.spots = spots;
          }
        }
      }
      return { ...prev, days };
    });
    // console.log("State after update",state);
  };

  // Book an interview and update state to reflect change
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const saveAppointment = axios.put(`/api/appointments/${id}`, {
      interview,
    });

    return saveAppointment.then((response) => {
      response.status === 200 && setState({ ...state, appointments });
      // console.log("Appointments after book interview", appointments)
      // console.log(response);
      updateSpots();
    });
  };

  // Cancel an interview and update state to reflect change
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const deleteAppointment = axios.delete(`/api/appointments/${id}`);

    return deleteAppointment.then((response) => {
      response.status === 200 && setState({ ...state, appointments });
      // console.log("Appointments after book interview", appointments)
      // console.log(response);
      updateSpots();
    });
  };

  // Load initial data from database to state
  useEffect(() => {
    const daysRequest = axios.get("/api/days");
    const appointmentsRequest = axios.get("/api/appointments");
    const interviewersRequest = axios.get("/api/interviewers");
    Promise.all([daysRequest, appointmentsRequest, interviewersRequest]).then(
      (all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        // console.log("Got data", days, appointments, interviewers);
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      }
    );
  }, []);

  const getEmptySpots = (day_id) => {
    const { appointments } = state;
    // console.log(state);
    let spots = 0;
    appointments.map((appointment) => {
      const { interview } = appointment;
      if (appointment.day_id === day_id && interview.interviewer_id === null) {
        spots++;
      }
    });
    return spots;
  };

  return { state, setDay, bookInterview, cancelInterview, getEmptySpots };
};

export default useApplicationData;
