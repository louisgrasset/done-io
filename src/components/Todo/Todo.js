import { useStore } from 'react-redux';
import { TOGGLE_TODO } from '../../actions';
import './Todo.scss';

export const Todo = ({ todo }) => {
    const store = useStore();
    const toggleTodo = () => {
        store.dispatch({
            type: TOGGLE_TODO,
            payload: {
                id: todo.id
            }
        });
    };
    return (
        <label className="todo">
            <div className="todo__input">
                <input type="checkbox" onChange={toggleTodo} checked={todo.completed} />
                <div className="todo__checkbox" style={{ borderColor: todo.color }}>
                    <div className="todo__checkbox-check" style={{ backgroundColor: todo.color }}></div>
                </div>
            </div>
            <span className="todo__text">{todo.text}</span>
        </label>
    );
};