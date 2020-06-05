import {
    CLEAR_MESSAGE,
    SHOW_FAILURE_MESSAGE,
    SHOW_SUCCESS_MESSAGE
} from '../actions/types.js';

export default function message(sate={ type: null, text: ''}, action) {
    switch(action.type) {
        case CLEAR_MESSAGE: {
            return action.message;
        }
        case SHOW_FAILURE_MESSAGE: {
            return action.message;
        }
        case SHOW_SUCCESS_MESSAGE: {
            return action.message;
        }
        default:
            return ({
                type: null,
                text: ''
            });
    }
}