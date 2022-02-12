export const GET_SCHEDULE_LIST = 'get_schedule_list';
export const GET_SCHEDULE_LIST_SUCCESS = 'get_schedule_list_succeeded';
export const GET_SCHEDULE_LIST_FAILED = 'get_schedule_list_failed';

export const GET_SCHEDULE = 'get_schedule';
export const GET_SCHEDULE_SUCCESS = 'get_schedule_succeeded';
export const GET_SCHEDULE_FAILED = 'get_schedule_failed';

export const CHANGE_SCHEDULE = 'change_schedule';

export const isEmpty = (object) => {
    return Object.keys(object).length === 0;
}

// * URLs
export const URL_SCHEDULE = "https://hilcoe-class-schedule.herokuapp.com/api/Schedule/";