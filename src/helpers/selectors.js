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
    if (element.name === day) {
      appointments.forEach((appointment)=>{
        if (element._id === appointment.day_id) {
          appointmentsForDay.push(appointment)
        }
      })
    }
  });
  console.log("Here are the appointments for today.", appointmentsForDay);
  return appointmentsForDay;
};

// Returns an object with the full interviewer object added
// to the interview data replacing the id of the
// interviewer
export const getInterview = (state, interview) => {
  if (interview === null) return null;

  const { interviewers } = state;
  let int = { ...interview };
  const id = int.interviewer;

  for (const interviewer in interviewers) {
    if (parseInt(interviewer) === id) {
      int.interviewer = interviewers[interviewer];
    }
  }
  return int;
};

// Returns an array of interviewers for the given day
export const getInterviewersForDay = (state, day) => {
  const { days, interviewers } = state;
  const interviewersForDay = [];

  days.forEach((element) => {
    if (element.name === day) {
      element.interviewers.map((i) => interviewersForDay.push(interviewers[i]));
    }
  });
  return interviewersForDay;
};
