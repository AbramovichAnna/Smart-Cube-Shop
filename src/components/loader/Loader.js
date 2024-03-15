import React from 'react';
import "./Loader.css";

function Loader() {
    return (
        <div className="loader-wrapper">
            <div className="welcome-text">
                <h3>Welcome to My Shop</h3>
            </div>
            <div className="cube">
                <div className="axis-switcher">
                    <div className="cube__comp">
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                    </div>
                    <div className="cube__comp">
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                        <div className="cube__face"></div>
                    </div>
                </div>
            </div>
            <div className="loading__text">
                <h5>Loading...</h5>
            </div>
        </div>

    );
}

export default Loader;
