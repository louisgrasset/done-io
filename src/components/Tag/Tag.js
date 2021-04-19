import { useSelector } from 'react-redux';
import './Tag.scss';

export const Tag = ({ tag, count, selected, action }) => {
    const theme = useSelector(s => s.options.theme);
    return (
        <div className={"tag" + (selected ? " tag--selected" : "")} onClick={() => action()}>
            <div className="tag__color">
                <div className="tag__color-item" style={{ backgroundColor: theme.palette[tag.color] }}></div>
            </div>
            <span className="tag__text">{tag.text}</span>
            {
                typeof count === 'number' ?
                    <span className="tag__count">
                        <span className="tag__count-value">{count}</span>
                    </span> : null
            }
        </div>
    );
};