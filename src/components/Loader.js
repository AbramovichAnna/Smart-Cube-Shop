import React from 'react'

function Loader() {
    return (
        <>
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
            <div className="loading-text">
                <h1 className="loading-text__title">Loading</h1>
                <p className="loading-text__text">Please wait a moment</p>
            </div>
        </>
    )
}

export default Loader