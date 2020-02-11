import React from 'react';

class Progress extends React.Component {

    setProgress = () => {
        let progress = this.props.popularity;
        let style = {
            width: progress + '%'
        };
        return style;
    }

    render() {
        return (
            <div className="tooltip">
                <div className="progress">
                    <span className="tooltiptext">Popularity {this.props.popularity}/100</span>
                    <div className="bar" style={this.setProgress()}>
                    </div>
                </div>
            </div>
        );
    }
}

export default Progress;