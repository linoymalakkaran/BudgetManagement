import {
    CLEAR_MESSAGE,
    SHOW_FAILURE_MESSAGE,
    SHOW_SUCCESS_MESSAGE
} from './types';

export function clearMessage() {
    return ({
        type: CLEAR_MESSAGE,
        message: {
            type: null,
            text: ''
        }
    });
}

export function showSuccess(text) {
    return ({
        type: SHOW_SUCCESS_MESSAGE,
        message: {
            type: 'SUCCESS',
            text
        }
    })
}

export function showFailure(text) {
    return ({
        type: SHOW_FAILURE_MESSAGE,
        message: {
            type: 'FAIL',
            text
        }
    })
}