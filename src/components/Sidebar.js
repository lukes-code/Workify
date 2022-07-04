import React from 'react';
import { capitalizeFirstLetter } from '../helper';

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="us-img">
                <img className="user-image" src={props.image} alt="" />
            </div>
            <div className="user-details">
                <h3 className="lowkey-label">MY ACCOUNT</h3>
                <p className="user-panel">{capitalizeFirstLetter(props.username)}</p>
                <p className="user-panel">{capitalizeFirstLetter(props.product)} user</p>
                <p className="user-panel">{props.followers} followers</p>
                <button
                onClick={props.signout}
                className="sign-out"
            >
                Sign Out
            </button>
            </div>
        </div>
    );
}

export default Sidebar;