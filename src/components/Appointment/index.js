import "components/Appointment/styles.scss";
import React from "react";
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'


// add the mode condition

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';


export default function Appointment(props){

// use the usevisualmode to apply the condition
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save function ------------------
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  // interview Delete----------

  const InterviwDelete = () => {
    transition(CONFIRM)
  }
  const confirmDelete = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  
  

  return(
    <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={InterviwDelete}
    onEdit={() => {transition(EDIT)}}
    />
    )}
    {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )} 
    {mode === SAVING && <Status message="Saving" />}
    {mode === DELETING && <Status message="Deleting" />}
    {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={confirmDelete}
          onCancel={back}
        />
      )}
    {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
  </article>
  );
}