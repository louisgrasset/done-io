import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { Modal } from '../Modal';
import { ADD_TAG } from '../../actions';
import iconPlus from '../../images/plus.svg';


export const ModalTag = ({ title, close }) => {
    const store = useStore();
    const tags = useSelector(s => s.tags);

    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [textInput, setTextInput] = useState([]);

    const handleText = () => {
        if (textInput.length > 0) {
            if (!tags.find(tag => tag.text === textInput)) {
                setText(textInput);
                setError(null);
                return true;
            }
            setError('Tag already exists');
            return false;
        }
        setError('Enter a tag name');
        return false;
    };

    const addTag = () => {
        if (handleText()) {
            store.dispatch({
                type: ADD_TAG,
                payload: {
                    text,
                    color: '#fff'
                }
            });
            close();
        }
    };
    return (
        <Modal className="modal--tag" title={title} close={close}>
            <input onBlur={handleText} autoFocus={true} placeholder="Work" className="modal__input modal__input--large" type="text" onChange={e => setTextInput(e.target.value)} value={textInput} />
            {error && <p>{error}</p>}
            <div className="modal__action" onClick={addTag}>
                <img className="modal__action-icon" src={iconPlus} alt="plus" />
                <span>Add this tag</span>
            </div>
        </Modal>
    );
};