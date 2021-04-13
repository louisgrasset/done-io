import './Modal.scss';
import iconClose from '../../images/close.svg';

export const Modal = ({ title, className, children, close }) => {
    return (
        <div className={`modal ${className}`}>
            {close &&
                <div className="modal__close" onClick={close}>
                    <img className="modal__close-icon" src={iconClose} alt="close" />
                </div>
            }
            {title &&
                <h1 className="modal__title">
                    {title}
                </h1>
            }
            {children}
        </div>
    );
};