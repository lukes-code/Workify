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
            <div class="progress">
                <div class="bar" style={this.setProgress()}>
                </div>
            </div>
        );
    }
}

export default Progress;