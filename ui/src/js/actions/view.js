import {
    SWITCH_VIEW
} from './types.js';

export function switchView(view) {
    return ({
        type: SWITCH_VIEW,
        view
    });
}