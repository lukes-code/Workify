import React from 'react';

export const Landing = () => {
    return (
        <div className="home-page">
            <div className="landing-logo">
                <h1 id="logo-label">Work<span className="spotify-default">ify</span></h1>
                <p id="sub-text">easily navigate work safe music</p>
            </div>
            <div className="landing-button">
            <a id="login" href="https://accounts.spotify.com/authorize?client_id=32eceb9f568649ada17a620892f797e0&redirect_uri=https://workify.netlify.com/callback/&scope=user-top-read user-read-private user-read-email user-read-recently-played user-follow-read&response_type=token&state=123">
                <button
                    className="def-btn"
                >
                Log in to Spotify
                </button>
            </a>
            </div>
        </div>
    );
}

export default Landing;