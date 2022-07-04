import React from 'react';

const Artist = (props) => {
    return (
        <div className="artist">
            <div className="artist-img">
                <a href={props.href}>
                    <img className="artist-image" src={props.image} alt={props.name} />
                </a>
            </div>
            <div className="artist-details">
                <h2>{props.name}</h2>
                <p>Followers: {props.followers}</p>
            </div>
        </div>
    );
}

export default Artist;