import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {  
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => console.log("Error:", error));
    }

  const deleteInterview = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
    transition(EMPTY)
  }


  return (
    <article className="appointment">
      <Header time={props.time}/>
      <>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            name=""
            interviewer=""
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={"Saving..."}/>}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you would like to delete?"}
            onCancel={ back }
            onConfirm={ deleteInterview }
          />
        )}
        {mode === DELETING && <Status message={"Deleting..."}/>}
        {mode === EDIT && (
          <Form
            name={props.name}
            interviewer={props.interview}
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
      </>
    </article>
  );
}
