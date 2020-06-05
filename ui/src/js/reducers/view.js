import {
    SWITCH_VIEW
} from '../actions/types.js';

export default function switch_view(state = 'budget', action) {
    return (action.view) || state;
}