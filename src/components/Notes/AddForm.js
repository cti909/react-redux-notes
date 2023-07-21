import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNotes } from "../../store/actions/NoteActions";
AddForm.propTypes = {};

function AddForm(props) {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user.id);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const inputTitle = useRef();
  const inputText = useRef();

  console.log("add form");

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  //   console.log(e.target.value);
  // };
  // const handleTextChange = (e) => {
  //   setText(e.target.value);
  // };
  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    const result = window.confirm("Are you want add new note?");
    if (result) {
      let value1 = inputTitle.current.value;
      let value2 = inputText.current.value;
      value2 = value2.replace(/\n/g, "<br/>");
      setTitle(value1);
      setText(value2);
      dispatch(AddNotes(value1, value2, user_id));
      setShowForm(false);
    }
  };
  const handleShowForm = (e) => {
    setShowForm(true);
  };
  const handleHiddenForm = (e) => {
    setShowForm(false);
  };
  return (
    <div className="mb-3">
      {showForm ? (
        <Form
          className="border shadow p-2 bg-body rounded"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              ref={inputTitle}
              // onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content textarea</Form.Label>
            <Form.Control as="textarea" rows={3} ref={inputText} />
          </Form.Group>
          <Button className="me-2" type="submit" variant="primary">
            Send new note
          </Button>
          <Button variant="primary" onClick={handleHiddenForm}>
            Hidden form
          </Button>
        </Form>
      ) : (
        <Button variant="primary" onClick={handleShowForm}>
          Add new notes
        </Button>
      )}
    </div>
  );
}

export default AddForm;
