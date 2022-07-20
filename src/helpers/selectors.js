export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  const appointmentsForDay = [];

  days.map((element) => {
    if (element.name === day) {
      element.appointments.map((apt) =>
        appointmentsForDay.push(appointments[apt])
      );
    }
  });
  return appointmentsForDay;
};

export const getInterview = (state, interview) => {
  if (interview === null) return null;

  const { interviewers } = state;
  let int = { ...interview };
  const id = interview.interviewer;

  for (const interviewer in interviewers) {
    if (parseInt(interviewer) === id) {
      int.interviewer = interviewers[interviewer];
    }
  }
  return int;
};
