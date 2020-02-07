import React from 'react';
import { capitalizeFirstLetter } from '../helper';

class Sidebar extends React.Component {

    render() {
        
        return (
            <div className="sidebar">
                <div className="us-img">
                    <img className="user-image" src={this.props.image} alt="" />
                </div>
                <div className="user-details">
                    <h3 className="lowkey-label">MY ACCOUNT</h3>
                    <p className="user-panel">{capitalizeFirstLetter(this.props.username)}</p>
                    <p className="user-panel">{capitalizeFirstLetter(this.props.product)} user</p>
                    <p className="user-panel">{this.props.followers} followers</p>
                </div>
            </div>
        );
    }
}

export default Sidebar;