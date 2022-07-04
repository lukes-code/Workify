import React from 'react';
import { millisToMinutesAndSeconds } from '../helper';
import Progress from './Progress';

const explicit = (isExplicit) => {
    if(isExplicit){
        return 'notsafe';
    } else {
        return 'safe';
    }
}

const UserTopTracks = (props) => {
    return (
        <div className="track" id={explicit(props.explicit)}>
            <img className="album-cover" src={props.image} alt={props.track} />
            <p className="top-track-name">{props.artist} - {props.tracks}</p>
            <p className="top-track-duration">{millisToMinutesAndSeconds(props.duration)}</p>
            <Progress
                popularity={props.popularity}
            />
        </div>
    );
}
export default UserTopTracks;