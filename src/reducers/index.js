import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import auth from "./auth";
import todos from "./todo";

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  todos
});