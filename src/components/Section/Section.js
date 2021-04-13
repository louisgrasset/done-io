import './Section.scss';
import iconCarret from '../../images/carret.svg';
import iconPlus from '../../images/plus.svg';
import { useState } from 'react';

export const Section = ({ name, itemsCount, children, action }) => {
    const [close, setClose] = useState(false);
    return (
        <section className={"section" + (close ? " section--close" : "")}>
            <div className="section__header" onClick={() => setClose(!close)}>
                <div className="section__toggle">
                    <img className="section__toggle-icon" src={iconCarret} alt={close ? "carret right" : "carret down"} />
                </div>
                <span className="section__text">{name}</span>
                <div className="section__action" onClick={e => { e.stopPropagation(); action(); }}>
                    <img className="section__action-icon" src={iconPlus} alt={close ? "carret right" : "carret down"} />
                </div>
            </div>
            <div className="section__content" style={{ height: itemsCount ? `${32.8 * itemsCount}px` : '6rem' }}>
                {children}
            </div>
        </section >
    );
};