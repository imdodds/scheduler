export function getAppointmentsForDay(state, day) {

  let result = [];

  for (let date of state.days) {
    if (day === date.name) {
      for (let i of date.appointments) {
        result.push(state.appointments[i])
      }
    }
  }

  return result;

}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}
