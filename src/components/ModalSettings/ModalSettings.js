import './ModalSettings.scss';
import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { Modal } from '../Modal';
import { SET_OPTION_THEME } from '../../actions';
import iconCheck from '../../images/check.svg';

export const ModalSettings = ({ title, close }) => {
    const themes = [
        {
            id: 'default',
            name: 'Default',
            palette: ['#43778C', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']
        },
        {
            id: 'cocorico',
            name: 'Cocorico',
            palette: ['#e63946', '#2a9d8f', '#a8dadc', '#457b9d', '#1d3557']
        },
        {
            id: 'pastel',
            name: 'Pastel',
            palette: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']
        },
        {
            id: 'pop',
            name: 'Pop',
            palette: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4']
        },
        {
            id: 'avocado',
            name: 'Avocado',
            palette: ['#2c6e49', '#4c956c', '#fefee3', '#ffc9b9', '#d68c45']
        }
    ];
    const store = useStore();
    const state = useSelector(s => s);

    const [theme, setTheme] = useState(state.options.theme);

    const saveTheme = () => {
        store.dispatch({
            type: SET_OPTION_THEME,
            payload: {
                theme,
            }
        });
        close();
    };
    return (
        <Modal className="modal--settings" title={title} close={close}>
            <h4>Theme</h4>
            {
                themes.map((t, key) =>
                    <div key={key} className={"modal__themes-item" + (
                        t.id === theme.id ? " modal__themes-item--selected" : "")}
                        onClick={() => setTheme(t)}>
                        {
                            t.palette.map((color, k) =>
                                <span key={k} className="modal__themes-item__color" style={{ backgroundColor: color }}></span>
                            )
                        }
                    </div>
                )
            }
            <div className="modal__action" onClick={saveTheme}>
                <img className="modal__action-icon" src={iconCheck} alt="check" />
                <span>Choose theme</span>
            </div>
        </Modal >
    );
};