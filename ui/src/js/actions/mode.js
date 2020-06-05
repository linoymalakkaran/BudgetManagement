import {
    SET_MODE,
    CLEAR_MODE
} from './types.js';

export function setMode(mode) {
    return ({
        type: SET_MODE,
        mode
    });
}

export function clearMode() {
    return ({
        type: CLEAR_MODE,
        mode: null
    });
}
