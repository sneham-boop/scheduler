// Returns an array of appointments for the given day
export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  const appointmentsForDay = [];

  days.forEach((element) => {
    // if (element.name === day) {
    //   element.appointments.map((apt) =>
    //     appointmentsForDay.push(appointments[apt])
    //   );
    // }
    // console.log(appointments);
    if (element.name === day) {
      appointments.forEach((appointment) => {
        if (element._id === appointment.day_id) {
          appointmentsForDay.push(appointment);
        }
      });
    }
  });
  console.log("Here are the appointments for today.", appointmentsForDay);
  return appointmentsForDay;
};

// Returns an object with the full interviewer object added
// to the interview data replacing the id of the
// interviewer
export const getInterview = (state, interview) => {
  // console.log("I got interview", interview)
  if (interview.interviewer_id === null) return null;

  const { interviewers } = state;
  let int = { ...interview };
  const id = int.interviewer_id;

  for (const interviewer of interviewers) {
    if (interviewer._id === id) {
      int.interviewer = interviewer;
    }
  }
  // console.log("Here's the interview", int);
  return int;
};

// Returns an array of interviewers for the given day
export const getInterviewersForDay = (state, currentDay) => {
  const { days, interviewers } = state;
  const interviewersForDay = [];

  days.forEach((day) => {
    // if (element.name === day) {
    //   element.interviewers.map((i) => interviewersForDay.push(interviewers[i]));
    // }
    if (day.name === currentDay) {
      day.interviewers.map((id) => {
        interviewers.filter((interviewer) => {
          if (id === interviewer._id) {
            interviewersForDay.push(interviewer);
          }
        });
      });
    }
  });
  // console.log("Here's the interviewers for the day", interviewersForDay);
  return interviewersForDay;
};
