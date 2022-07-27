import { useState, useEffect } from "react";
import axios from "axios";

// This hook is used to manage state for the application. 
const useApplicationData = () => {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = () => {
    setState((prev) => {
      const { day, appointments, days } = {...prev};
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
  };

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
    return Promise.all([saveAppointment])
      .then((all) => all[0].status)
      .then((status) => {
        status === 204 && setState({ ...state, appointments });
      })
      .then(() => updateSpots());
  };

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

    return Promise.all([deleteAppointment])
      .then((all) => all[0].status)
      .then((status) => {
        status === 204 && setState({ ...state, appointments });
      })
      .then(() => updateSpots());
  };

  useEffect(() => {
    const daysRequest = axios.get("/api/days");
    const appointmentsRequest = axios.get("/api/appointments");
    const interviewersRequest = axios.get("/api/interviewers");
    Promise.all([daysRequest, appointmentsRequest, interviewersRequest]).then(
      (all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;

        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
