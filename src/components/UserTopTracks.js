import React from 'react';
import { millisToMinutesAndSeconds } from '../helper';
import Progress from './Progress';

class UserTopTracks extends React.Component {

    explicit = () => {
        let explicit = this.props.explicit;
        if(explicit === true){
            return 'notsafe';
        } else {
            return 'safe';
        }
    }

    render() {

        return (
            <div className="track" id={this.explicit()}>
                    <img className="album-cover" src={this.props.image} alt={this.props.track} />
                    <p className="top-track-name">{this.props.artist} - {this.props.tracks}</p>
                    <p className="top-track-duration">{millisToMinutesAndSeconds(this.props.duration)}</p>
                    <Progress
                        popularity={this.props.popularity}
                    />
                </div>
        );
    }
}

export default UserTopTracks;