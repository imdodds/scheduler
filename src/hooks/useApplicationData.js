import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState({...state, appointments, days });
    });

  };

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      setState({ ...state, appointments, days });
    });
    
  };

  const updateSpots = (state, appointments) => {

    const currentDay = state.days.find((day) => day.name === state.day);
    
    let spots = 0;
    for (const id of currentDay.appointments) {
      if (appointments[id].interview === null) {
        spots ++;
      }
    }

    const updatedDay = { ...currentDay, spots };

    const updatedDays = state.days.map((day) => {
      if (day.name === state.day) {
        return updatedDay;
      }
      return day;
    });

    return updatedDays;
  };

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((response) => {
        setState(prev => (
          {...prev, 
          days: response[0].data, 
          appointments: response[1].data, 
          interviewers: response[2].data}
        ));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview, updateSpots }

};
