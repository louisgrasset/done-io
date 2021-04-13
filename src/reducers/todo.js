import { v4 } from 'uuid';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions';

export function todoReducer (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([{ id: `todo-${v4()}`, text: action.payload.text, color: action.payload.color, tag: action.payload.tag, completed: false }]);
        case REMOVE_TODO:
            // + REMOVE_TAG
            return state.filter(todo => action.payload.id === todo.id);
        case TOGGLE_TODO:
            return state.map(todo =>
                action.payload.id === todo.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        default:
            return state;
    }
}