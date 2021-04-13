import './Placeholder.scss';

import iconPlus from '../../images/plus.svg';

export const Placeholder = ({ statusText, actionText, action }) => {
    return (
        <div className="placeholder" onClick={action}>
            <span className="placeholder__text">{statusText}</span>
            <div className="placeholder__action">
                <img className="placeholder__action-icon" src={iconPlus} alt="plus" />
                <span>{actionText}</span>
            </div>
        </div>
    );
};