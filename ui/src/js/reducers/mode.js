import {
    CLEAR_MODE,
    SET_MODE
} from '../actions/types.js';

export default function mode(state=null, action) {
    switch(action.type) {
        case CLEAR_MODE: {
            return null;
        }
        case SET_MODE: {
            return action.mode;
        }
        default:
            return null;
    }
}