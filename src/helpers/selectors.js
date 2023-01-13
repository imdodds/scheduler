export function getAppointmentsForDay(state, day) {

  let result = [];

  for (let item of state.days) {
    if (day === item.name) {
      for (let i of item.appointments) {
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

export function getInterviewersForDay(state, day) {
  
  let result = [];

  for (let item of state.days) {
    if (day === item.name) {
      for (let i of item.interviewers) {
        result.push(state.interviewers[i])
      }
    }
  }

  return result;

}