import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const dailyAppointments = getAppointmentsForDay(state,state.day);

  useEffect(() => {
    const daysRequest = axios.get("/api/days");
    const appointmentsRequest = axios.get("/api/appointments");
    Promise.all([daysRequest, appointmentsRequest]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      console.log(appointments);
      setState((prev) => ({ ...prev, days, appointments }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment} />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
