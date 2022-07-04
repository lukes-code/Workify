import React from 'react';

const setProgress = (popularity) => {
    let style = {
        width: popularity + '%'
    };
    return style;
}

const Progress = (props) => {
    return (
        <div className="tooltip">
            <div className="progress">
                <span className="tooltiptext">Popularity {props.popularity}/100</span>
                <div className="bar" style={setProgress(props.popularity)}>
                </div>
            </div>
        </div>
    );
}

export default Progress;