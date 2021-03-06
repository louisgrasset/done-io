import './ModalTodo.scss';
import { useState, useMemo } from "react";
import { useSelector, useStore } from "react-redux";
import { Modal } from '../Modal';
import { Tag } from '../Tag';
import { ADD_TODO } from '../../actions';
import iconPlus from '../../images/plus.svg';

export const ModalTodo = ({ title, close }) => {
    const store = useStore();
    const state = useSelector(s => s);

    const [text, setText] = useState('');
    const [tag, setTag] = useState(null);
    const [textInput, setTextInput] = useState([]);
    const [tagSearchInput, setTagSearchInput] = useState([]);

    const tags = useMemo(
        () => tagSearchInput.length
            ? state.tags.filter(tag => tag.text.toLowerCase().startsWith(tagSearchInput))
            : state.tags
        , [tagSearchInput, state.tags]);

    const handleText = () => { if (textInput.length > 0) { setText(textInput); return true; } return false; };
    const handleTag = () => {
        if (tagSearchInput.length > 0) {
            if (state.tags.find(tag => tag === tagSearchInput)) {
                setTag(state.tags.filter(tag => tag === tagSearchInput)[0]);
                return true;
            }
        }
        return true;
    };

    const addTodo = () => {
        if (handleText() && handleTag()) {
            console.log(tag.id);
            store.dispatch({
                type: ADD_TODO,
                payload: {
                    text,
                    tag: tag.id,
                    color: tag.color
                }
            });
            close();
        }
    };
    return (
        <Modal className="modal--todo" title={title} close={close}>
            <input onBlur={handleText} autoFocus={true} placeholder="Eat vegetables" className="modal__input modal__input--large" type="text" onChange={e => setTextInput(e.target.value)} value={textInput} />
            <label>
                <input placeholder={"Search for a tag"} className="modal__input" type="text" onChange={e => setTagSearchInput(e.target.value.toLowerCase())} value={tagSearchInput} />
            </label>
            {
                tags.length
                    ? (<div className="modal__tags">
                        {
                            tags.map((t, key) => (
                                <Tag key={key} tag={t} selected={tag?.id === t.id} action={() => setTag(t)} />
                            ))
                        }
                    </div>)
                    : null

            }

            <div className="modal__action" onClick={addTodo}>
                <img className="modal__action-icon" src={iconPlus} alt="plus" />
                <span>Add this todo</span>
            </div>
        </Modal >
    );
};