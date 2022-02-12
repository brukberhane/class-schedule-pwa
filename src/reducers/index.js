import { combineReducers } from "redux";
import scheduleReducer from "./ScheduleReducer";

export default combineReducers({
    schedule: scheduleReducer
});