
import { SET_OPTION_FILTER, SET_OPTION_THEME } from '../actions';
import { SHOW_ALL } from '../filters';

export function optionReducer (state = {
    filter: SHOW_ALL, theme:
    {
        id: 'pop',
        name: 'Pop',
        palette: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4']
    },
}, action) {
    switch (action.type) {
        case SET_OPTION_FILTER:
            return { ...state, filter: action.payload.filter };
        case SET_OPTION_THEME:
            return { ...state, theme: action.payload.theme };
        default:
            return state;
    }
}