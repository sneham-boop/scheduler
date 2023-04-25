import React from "react";
import styles from "./Application.module.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import useApplicationData from "../hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className={styles.layout}>
      {/* <section className={styles.sidebar}>
        <img
          className={styles["sidebar--centered"]}
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr
          className={`${styles["sidebar__separator"]} ${styles["sidebar--centered"]}`}
        />
        <nav className={styles["sidebar__menu"]}>
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className={`${styles["sidebar__lhl"]} ${styles["sidebar--centered"]}`}
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className={styles["schedule"]}>
        {appointments}
        <Appointment key="last" time="5pm" />
      </section> */}
    </main>
  );
} 
