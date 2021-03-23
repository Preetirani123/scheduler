import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // update spot ------------------
   const updateSpot = function(value) {
     const listOfDays = [...state.days]
     const today = state.days.find(day => day.name === state.day)

     for(const day of listOfDays){
       if(day.id === today.id){
         day.spots += value
       }
     }
     return listOfDays;
   }


  // create appointment---------------
  function bookInterview(id, interview) {
     const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpot(-1)
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({...state, appointments, days}))
  }


  // cancel appointment--------------

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpot(1)
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => setState({...state, appointments, days}))
  };

  useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
      axios.get('/api/interviewers')
		]).then((all) => {
      // console.log(all)
			setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
		});
	}, []);
  return { state, setDay, bookInterview, cancelInterview };
}