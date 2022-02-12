import {
  GET_SCHEDULE,
  GET_SCHEDULE_FAILED,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_LIST,
  GET_SCHEDULE_LIST_FAILED,
  GET_SCHEDULE_LIST_SUCCESS, CHANGE_SCHEDULE
} from '../Constants';

const INITIAL_SCHEDULE_STATE = {
  loading: false,
  selected: true,
  scheduleList: [],
  schedule: {},
  errors: ''
}

export default function scheduleReducer(state = INITIAL_SCHEDULE_STATE, action) {
  switch (action.type) {
    case GET_SCHEDULE_LIST:
      return { ...state, loading: true, errors: ''};
    case GET_SCHEDULE_LIST_SUCCESS:
      return { ...state, loading: false, scheduleList: action.payload, errors: ''};
    case GET_SCHEDULE_LIST_FAILED:
      return { ...state, loading: false, errors: action.payload.errors };
    case GET_SCHEDULE:
      return { ...state, loading: true, errors: '' };
    case GET_SCHEDULE_SUCCESS:
      return { ...state, loading: false, selected: true, schedule: action.payload, errors: '' };
    case GET_SCHEDULE_FAILED:
      return { ...state, loading: false, errors: action.payload.errors };
    case CHANGE_SCHEDULE:
      return { ...state, schedule: {}, selected: false }
    default:
      return state;
  }
}