import React from 'react'
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";



function Giftcard({ flipped, onClick, giftcard }) {


    return (
        <>
            <div className={`giftcard ${flipped ? 'flipped' : ''}`} onClick={onClick}>
                <div className="giftcard-content">
                    <div className="back">
                        <div className="back-content">
                            <GiPerspectiveDiceSixFacesRandom className="icon" />
                            <strong>Try Your Luck</strong>
                        </div>
                    </div>
                    <div className="front">
                        <div className="front-content">
                            <div className="front-card">
                                <div className="front-image">
                                    <img src="/images/giftcard_2-bg.png" alt="Giftcard Background" className="giftcard-image" />
                                </div>
                                <div className="info">
                                    <div className="footer-value">
                                        <h6>You Win</h6>
                                        <h5>${giftcard.value}</h5>
                                    </div>
                                    <div className="footer-button">
                                        <button className="gift-card-btn">Get Your Giftcard</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Giftcard;




