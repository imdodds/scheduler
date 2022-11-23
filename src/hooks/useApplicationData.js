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

    const foundDay = state.days.find(day => day.appointments.includes(id));

    const days = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return day={...day, spots: day.spots-1}
      } else {
        return day;
      }
    })

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => (
          { ...prev,
            appointments,
            days }
          ));
        })
  
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const foundDay = state.days.find(day => day.appointments.includes(id));

    const days = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return day={...day, spots: day.spots+1}
      } else {
        return day;
      }
    })

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState((prev) => ({...prev, appointments, days }))
    })
  }

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

  return { state, setDay, bookInterview, cancelInterview }

};
