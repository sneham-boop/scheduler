// Returns an array of appointments for the given day
export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  const appointmentsForDay = [];

  days.forEach((element) => {
    if (element.name === day) {
      appointments.forEach((appointment) => {
        if (element._id === appointment.day_id) {
          appointmentsForDay.push(appointment);
        }
      });
    }
  });
  return appointmentsForDay;
};

// Returns an object with the full interviewer object added
// to the interview data replacing the id of the
// interviewer
export const getInterview = (state, interview) => {
  if (interview.interviewer_id === null) return null;

  const { interviewers } = state;
  let int = { ...interview };
  const id = int.interviewer_id;

  for (const interviewer of interviewers) {
    if (interviewer._id === id) {
      int.interviewer = interviewer;
    }
  }
  return int;
};

// Returns an array of interviewers for the given day
export const getInterviewersForDay = (state, currentDay) => {
  const { days, interviewers } = state;
  const interviewersForDay = [];

  days.forEach((day) => {
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
  return interviewersForDay;
};
