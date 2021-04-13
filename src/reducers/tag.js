import { v4 } from 'uuid';
import { ADD_TAG, REMOVE_TAG } from '../actions';

export function tagReducer (state = [], action) {
    switch (action.type) {
        case ADD_TAG:
            return state.concat([{ id: `tag-${v4()}`, text: action.payload.text, color: action.payload.color }]);
        case REMOVE_TAG:
            return state.filter(tag => action.payload.id === tag.id);
        default:
            return state;
    }
}
