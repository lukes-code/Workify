import React from 'react';
import { millisToMinutesAndSeconds } from '../helper';
import Progress from './Progress';

const SafeTracks = (props) => {
    if(props.trackName){
        return (
            <div className="track" id="safe">
                <img className="album-cover" src={props.image} alt={props.albumName} />
                <p className="top-track-name">{props.trackName}</p>
                <p className="top-track-duration">{millisToMinutesAndSeconds(props.duration)}</p>
                <Progress
                    popularity={props.popularity}
                />
            </div>
        );
    } else {
        return (
            <p>Sorry, no safe tracks</p>
        );
    }
    
}

export default SafeTracks;