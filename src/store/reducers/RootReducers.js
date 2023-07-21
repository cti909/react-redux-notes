import { combineReducers } from "redux";
import NotesReducer from "./NoteReducers";
import AuthReducer from "./AuthReducers";
console.log("reducer public");

const rootReducer = combineReducers({
    notes: NotesReducer,
    auth: AuthReducer
  })
  
export default rootReducer