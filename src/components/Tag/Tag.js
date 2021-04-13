import './Tag.scss';

export const Tag = ({ tag, count }) => {
    return (
        <label className="tag">
            <div className="tag__color">
                <div className="tag__color-item" style={{ backgroundColor: tag.color }}></div>
            </div>
            <span className="tag__text">{tag.text}</span>
            <span className="tag__count">
                <span className="tag__count-value">{count}</span>
            </span>
        </label>
    );
};