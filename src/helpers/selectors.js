
//Retrieve the week day and return appointment information
export  function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(days => days.name === day);

  if (!filteredDay) 
  return [];

  const appointmentArray = filteredDay.appointments.map(appointment => state.appointments[appointment]);
  return appointmentArray;
};

//Retrieve Interviewer information
export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

//Retrieve the week day and return Interviewer list
export  function getInterviewersForDay(state, day) {
  const [filteredDay] = state.days.filter(days => days.name === day);

  if (!filteredDay) 
  return [];

  const interviewersArray = filteredDay.interviewers.map(interview => state.interviewers[interview]);
  return interviewersArray;
};
