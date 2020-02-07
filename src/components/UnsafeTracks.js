import React from 'react';
import { millisToMinutesAndSeconds } from '../helper';

class UnafeTracks extends React.Component {
    
    render() {
            return (
                <div className="track">
                    <img className="album-cover" src={this.props.unsafeTrack.album.images[2].url} alt={this.props.unsafeTrack.album.name} />
                    <p className="top-track-name">{this.props.unsafeTrack.name}</p>
                    <p className="top-track-duration">{millisToMinutesAndSeconds(this.props.unsafeTrack.duration_ms)}</p>
                </div>
            );
    }
}

export default UnafeTracks;