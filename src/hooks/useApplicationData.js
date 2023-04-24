import { useState, useEffect } from "react";
import axios from "axios";

// const appointments_dummy = {
//   1: {
//     id: 1,
//     time: "12pm",
//     interview: { student: "Taylor Sims", interviewer: 3 },
//   },
//   2: {
//     id: 2,
//     time: "1pm",
//     interview: { student: "Archie Cohen", interviewer: 10 },
//   },
//   3: {
//     id: 3,
//     time: "2pm",
//     interview: { student: "Bill Dale", interviewer: 3 },
//   },
//   4: { id: 4, time: "3pm", interview: null },
//   5: { id: 5, time: "4pm", interview: null },
//   6: { id: 6, time: "12pm", interview: null },
//   7: { id: 7, time: "1pm", interview: null },
//   8: { id: 8, time: "2pm", interview: null },
//   9: { id: 9, time: "3pm", interview: null },
//   10: {
//     id: 10,
//     time: "4pm",
//     interview: { student: "Chad Takahashi", interviewer: 6 },
//   },
//   11: {
//     id: 11,
//     time: "12pm",
//     interview: { student: "Jamal Jordan", interviewer: 3 },
//   },
//   12: {
//     id: 12,
//     time: "1pm",
//     interview: { student: "Leopold Silvers", interviewer: 8 },
//   },
//   13: {
//     id: 13,
//     time: "2pm",
//     interview: { student: "Liam Martinez", interviewer: 9 },
//   },
//   14: { id: 14, time: "3pm", interview: null },
//   15: { id: 15, time: "4pm", interview: null },
//   16: {
//     id: 16,
//     time: "12pm",
//     interview: { student: "Lydia Miller-Jones", interviewer: 10 },
//   },
//   17: {
//     id: 17,
//     time: "1pm",
//     interview: { student: "Maria Boucher", interviewer: 10 },
//   },
//   18: {
//     id: 18,
//     time: "2pm",
//     interview: { student: "Michael Chan-Montoya", interviewer: 7 },
//   },
//   19: { id: 19, time: "3pm", interview: null },
//   20: { id: 20, time: "4pm", interview: null },
//   21: {
//     id: 21,
//     time: "12pm",
//     interview: { student: "Richard Wong", interviewer: 5 },
//   },
//   22: {
//     id: 22,
//     time: "1pm",
//     interview: { student: "Yuko Smith", interviewer: 5 },
//   },
//   23: { id: 23, time: "2pm", interview: null },
//   24: { id: 24, time: "3pm", interview: null },
//   25: { id: 25, time: "4pm", interview: null },
// };

// const days_dummy = [
//   {
//     id: 1,
//     name: "Monday",
//     appointments: [1, 2, 3, 4, 5],
//     interviewers: [3, 4, 8, 9, 10],
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     appointments: [6, 7, 8, 9, 10],
//     interviewers: [5, 6, 7, 9, 10],
//     spots: 4,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     appointments: [11, 12, 13, 14, 15],
//     interviewers: [3, 5, 7, 8, 9],
//     spots: 2,
//   },
//   {
//     id: 4,
//     name: "Thursday",
//     appointments: [16, 17, 18, 19, 20],
//     interviewers: [2, 4, 7, 9, 10],
//     spots: 2,
//   },
//   {
//     id: 5,
//     name: "Friday",
//     appointments: [21, 22, 23, 24, 25],
//     interviewers: [2, 4, 5, 6, 8],
//     spots: 3,
//   },
// ];

// const interviewers_dummy = {
//   1: {
//     id: 1,
//     name: "Sylvia Palmer",
//     avatar: "https://i.imgur.com/LpaY82x.png",
//   },
//   2: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   3: {
//     id: 3,
//     name: "Mildred Nazir",
//     avatar: "https://i.imgur.com/T2WwVfS.png",
//   },
//   4: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   5: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
//   6: {
//     id: 6,
//     name: "Susan Reynolds",
//     avatar: "https://i.imgur.com/TdOAdde.jpg",
//   },
//   7: { id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg" },
//   8: { id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg" },
//   9: { id: 9, name: "Lindsay Chu", avatar: "https://i.imgur.com/nPywAp1.jpg" },
//   10: {
//     id: 10,
//     name: "Samantha Stanic",
//     avatar: "https://i.imgur.com/okB9WKC.jpg",
//   },
// };

// This custom hook is used to manage state for the application.

const useApplicationData = () => {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
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
      response.status === 204 && setState({ ...state, appointments });
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
      response.status === 204 && setState({ ...state, appointments });
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
        // console.log("Got data", days, appointments, interviewers)
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
