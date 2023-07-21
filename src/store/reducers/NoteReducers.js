import {
  ADD_NOTE,
  DELETE_NOTE,
  FILTER_ALL_NOTE,
  GET_ALL_NOTE,
  UPDATE_NOTE,
} from "../../constants/ActionConstant";

const initState = {
  data: [], // du lieu note
  pagination: [], // phan trang
};

console.log("reducer notes");

// tree state/notes
const NotesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_NOTE:
      console.log("reducer GET_ALL_NOTE");
      return {
        ...state,
        data: action.payload.data,
        pagination: action.payload.meta,
      };
    case FILTER_ALL_NOTE:
      console.log("reducer FILTER_ALL_NOTE");
      return {
        ...state,
        data: action.payload.data,
        pagination: action.payload.meta,
      };
    case ADD_NOTE:
      console.log("reducer ADD_NOTE");
      return {
        ...state,
        data: action.payload.data,
        pagination: action.payload.meta,
      };
    case UPDATE_NOTE:
      console.log("reducer UPDATE_NOTE");
      return {
        ...state,
        data: action.payload.data,
        pagination: action.payload.meta,
      };
    case DELETE_NOTE:
      console.log("reducer DELETE_NOTE");
      return {
        ...state,
        data: action.payload.data,
        pagination: action.payload.meta,
      };

    default:
      return state;
  }
};

export default NotesReducer;
