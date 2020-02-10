import React from 'react';
import Disclaimer from '../disclaimer.svg';

class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <h1 id="disclaimer">Disclaimer</h1>
                <div className="disclaimer-content">
                    <img className="disclaimer-image" src={Disclaimer} alt="Disclaimer"/>
                    <p>Please be advised, this app is powered by Spotify and "work safe" songs are noted by use of Spotify's explicit tag and not of our own judgement.</p>
                </div>
                <button
                    id="disclaimer-btn"
                    className="def-btn"
                    onClick={this.props.enter}
                >
                    Enter
                </button>
            </div>
        );
    }
}

export default Welcome;