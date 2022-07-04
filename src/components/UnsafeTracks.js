import React from 'react';
import { millisToMinutesAndSeconds } from '../helper';
import Progress from './Progress';

const UnafeTracks = (props) => {
    return (
        <div className="track" id="notsafe">
            <img className="album-cover" src={props.image} alt={props.albumName} />
            <p className="top-track-name">{props.trackName}</p>
            <p className="top-track-duration">{millisToMinutesAndSeconds(props.duration)}</p>
            <Progress
                popularity={props.popularity}
            />
        </div>
    );
}

export default UnafeTracks;