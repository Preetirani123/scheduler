export default  function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(days => days.name === day);

  if (!filteredDay || !state.days.length === 0) 
  return [];

  const appointmentArray = filteredDay.appointments.map(appointment => state.appointments[appointment]);
  return appointmentArray;
};