import {
  addNotes,
  deleteNotes,
  editNotes,
  filterAllNotes,
  getAllNotes,
} from "../../services/Notes/Notes.service";
import {
  ADD_NOTE,
  ADD_NOTE_FAILED,
  ADD_NOTE_SUCCESS,
  DELETE_NOTE,
  DELETE_NOTE_FAILED,
  DELETE_NOTE_SUCCESS,
  GET_ALL_NOTE,
  UPDATE_NOTE,
  UPDATE_NOTE_FAILED,
  UPDATE_NOTE_SUCCESS,
} from "../../constants/ActionConstant";

console.log("action note");

/**
 * Lay notes trong 1 trang
 */
export const GetAllNotes = () => {
  return async (dispatch) => {
    try {
      const response = await getAllNotes();
      dispatch({
        type: GET_ALL_NOTE,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ALL_NOTE,
        payload: [],
      });
    }
  };
};

export const FilterAllNotes = (sortType, column, search, page) => {
  return async (dispatch) => {
    try {
      const response = await filterAllNotes(sortType, column, search, page);
      dispatch({
        type: GET_ALL_NOTE,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ALL_NOTE,
        payload: [],
      });
    }
  };
};

// action dispatch di dau ???
export const AddNotes = (title, text, user_id) => {
  return async (dispatch) => {
    try {
      const response = await addNotes(title, text, user_id);
      dispatch({
        type: ADD_NOTE,
        payload: { data: response.data, meta: response.meta },
      });
      return ADD_NOTE_SUCCESS;
    } catch (err) {
      console.log(err);
      dispatch({
        type: ADD_NOTE,
        payload: [],
      });
      return ADD_NOTE_FAILED;
    }
  };
};

export const EditNotes = (title, text, note_id) => {
  return async (dispatch) => {
    try {
      const response = await editNotes(title, text, note_id);
      dispatch({
        type: UPDATE_NOTE,
        payload: { data: response.data, meta: response.meta },
      });
      return UPDATE_NOTE_SUCCESS;
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_NOTE,
        payload: [],
      });
      return UPDATE_NOTE_FAILED;
    }
  };
};

export const DeleteNotes = (note_id, sortType, column, search) => {
  return async (dispatch) => {
    try {
      const response = await deleteNotes(note_id, sortType, column, search);
      dispatch({
        type: DELETE_NOTE,
        payload: { data: response.data, meta: response.meta },
      });
      return DELETE_NOTE_SUCCESS;
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_NOTE,
        payload: [],
      });
      return DELETE_NOTE_FAILED;
    }
  };
};
