import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonEdit from "../public/ButtonEdit";
import ButtonDelete from "../public/ButtonDelete";
import ButtonSave from "../public/ButtonSave";
import ButtonCancel from "../public/ButtonCancel";
import { useDispatch, useSelector } from "react-redux";
import { DeleteNotes, EditNotes } from "../../store/actions/NoteActions";
import AddForm from "./AddForm";
import { Form } from "react-bootstrap";
import {} from "../../assets/css/text.css";
import { UPDATE_NOTE_SUCCESS } from "../../constants/ActionConstant";
import convertTime from "../public/ConvertTime";

function NotesList(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.id) ?? 0;
  const [editNoteId, setEditNoteId] = useState(0);
  const [titleEdit, setTitleEdit] = useState("");
  const [textEdit, setTextEdit] = useState("");

  // xoa 1 note
  const handleClickDelete = (note_id) => {
    console.log("delete click", note_id);
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      dispatch(
        DeleteNotes(
          note_id,
          props.sortName,
          props.selectField,
          props.searchText
        )
      );
    }
  };

  // hien thi edit form va button save - cancel
  const handleClickEdit = (note_id, title, text) => {
    console.log(text);
    let text_field = text.replace("<br/>", "\n");
    setEditNoteId(note_id);
    setTitleEdit(title);
    setTextEdit(text_field);
  };

  // luu note vua chinh sua
  const handleClickSave = (note_id) => {
    const result = window.confirm("Are you want update this note?");
    if (result) {
      let value = textEdit.replace(/\n/g, "<br/>");
      dispatch(EditNotes(titleEdit, value, note_id))
        .then((res) => {
          console.log(res);
          if (res === UPDATE_NOTE_SUCCESS) {
            alert("Update this note success!");
            setEditNoteId(0);
            setTitleEdit("");
            setTextEdit("");
          } else {
            alert("Email or password failed!");
          }
        })
        .catch((error) => {});
    }
  };

  // huy edit form
  const handleClickCancel = (note_id) => {
    setEditNoteId(0);
  };

  // cap nhat state cua add form
  const handleChangeTitle = (e) => {
    setTitleEdit(e.target.value);
  };
  const handleChangeText = (e) => {
    setTextEdit(e.target.value);
  };

  return (
    <div className="mt-4">
      {user !== 0 && <AddForm />}
      {props.notesData ? (
        props.notesData.map((item) => (
          <div className="border shadow p-2 mb-3 bg-body rounded" key={item.id}>
            <div className="d-flex align-items-center">
              <h5>
                IDCreator: {item.user_id}
                <span className="ms-2">|{convertTime(item.updated_at)}</span>
              </h5>
              {item.user_id === user && (
                <div className="d-flex ms-3 me-2">
                  {editNoteId !== item.id ? (
                    <>
                      <div className="me-2">
                        <ButtonEdit
                          handleClickEdit={() =>
                            handleClickEdit(item.id, item.title, item.text)
                          }
                        />
                      </div>
                      <div className="me-2">
                        <ButtonDelete
                          handleClickDelete={() => handleClickDelete(item.id)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="me-2">
                        <ButtonSave
                          handleClickSave={() => handleClickSave(item.id)}
                        />
                      </div>
                      <div className="me-2">
                        <ButtonCancel
                          handleClickCancel={() => handleClickCancel(item.id)}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              {item.updated_at !== item.created_at && <span>| Edited</span>}
            </div>
            {editNoteId === item.id ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tilte</Form.Label>
                  <Form.Control
                    type="text"
                    value={titleEdit}
                    placeholder="Title"
                    onChange={handleChangeTitle}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={textEdit}
                    onChange={handleChangeText}
                  />
                </Form.Group>
              </Form>
            ) : (
              <>
                <strong>Title: {item.title}</strong>
                {/* <p>{item.text}</p> */}
                {item.text.split("<br/>").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </>
            )}
          </div>
        ))
      ) : (
        <span className="d-flex justify-content-center text-center">
          No entry
        </span>
      )}
    </div>
  );
}

NotesList.propTypes = {};

export default NotesList;
