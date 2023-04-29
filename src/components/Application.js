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

import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({
  weight: ["900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment._id}
          id={appointment._id}
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
      <section className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img
            className={`${styles["sidebar--centered"]} ${styles["logo"]}`}
            src="images/fullLogo.svg"
            alt="Interview Scheduler"
          />
        </div>

        <hr
          className={`${styles["sidebar__separator"]} ${styles["sidebar--centered"]}`}
        />
        <nav className={styles["sidebar__menu"]}>
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className={`${styles["sidebar__lhl"]} ${styles["sidebar--centered"]}`}
          src="images/shortLogo.svg"
          alt="Lighthouse Labs"
        />
      </section>
      <section className={styles["schedule"]}>
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
