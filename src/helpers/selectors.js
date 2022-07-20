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
