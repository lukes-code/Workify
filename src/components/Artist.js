import React from 'react';

class Artist extends React.Component {

    render() {
        return (
            <div className="artist">
                <div className="artist-img">
                    <a href={this.props.href}>
                        <img className="artist-image" src={this.props.image} alt={this.props.name} />
                    </a>
                </div>
                <div className="artist-details">
                    <h2>{this.props.name}</h2>
                    <p>Followers: {this.props.followers}</p>
                    <p>Popularity: {this.props.popularity}/100</p>
                    <p>Are any of the artists top tracks work safe? {this.props.hasSafeTracks}</p>
                </div>
            </div>
        );
    }
}

export default Artist;