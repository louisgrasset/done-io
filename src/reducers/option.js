
import { SET_OPTION_FILTER } from '../actions';
import { SHOW_ALL } from '../filters';

export function optionReducer (state = { filter: SHOW_ALL }, action) {
    if (action.type === SET_OPTION_FILTER) {
        return {
            ...state,
            filter: action.payload.filter
        };
    } else {
        return state;
    }
}