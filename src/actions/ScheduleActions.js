import {
  GET_SCHEDULE,
  GET_SCHEDULE_FAILED,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_LIST,
  GET_SCHEDULE_LIST_FAILED,
  GET_SCHEDULE_LIST_SUCCESS, URL_SCHEDULE, CHANGE_SCHEDULE
} from "../Constants";
import axios from "axios";

export const getScheduleList = () => dispatch => {
  dispatch({ type: GET_SCHEDULE_LIST})

  axios.get(URL_SCHEDULE)
      .then((response) => {
          getScheduleListSuccess(dispatch, response)
      }).catch(error => {
          getScheduleListFailed(dispatch, error);
      });
};

const getScheduleListSuccess = (dispatch, response) => {
  dispatch ({
      type: GET_SCHEDULE_LIST_SUCCESS,
      payload: response.data
  });
  console.info(`Get List Success ✅, ${response.data}`);
};

const getScheduleListFailed = (dispatch, error) => {
  dispatch({
      type: GET_SCHEDULE_LIST_FAILED,
      payload: {errors: error}
  });
  console.error(`Get List Failed ❌, ${error}`);
};

export const getSchedule = (batch) => dispatch => {
  dispatch({ type: GET_SCHEDULE });

  axios.get(`${URL_SCHEDULE}${encodeURIComponent(batch)}`)
      .then((response) => {
          getScheduleSuccess(dispatch, response);
      })
      .catch((error) => {
          getScheduleFailed(dispatch, error);
      });
};

const getScheduleSuccess = (dispatch, response) => {
  console.info(`Schedule ✅: ${response}`);
  dispatch({
      type: GET_SCHEDULE_SUCCESS,
      payload: response.data
  });
};

const getScheduleFailed = (dispatch, error) => {
  console.error(`Schedule ❌: ${error}`)
  dispatch({
      type: GET_SCHEDULE_FAILED,
      payload: { errors: error }
  });
};

export const changeSchedule = () => dispatch => {
  dispatch({type: CHANGE_SCHEDULE});
};