import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './Payment.css';

const Payment = ({ total }) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('Processing payment for:', total); 
    }


    return (
        <>
            <div className="section_head">
                <h3 className="heading" style={{ fontWeight: "700", fontFamily: "Montserrat" }}>Payment (demo)</h3>
            </div>

            <div className="payment-form-container">

                <div className="card-container">
                    <Cards
                        number={state.number}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        name={state.name}
                        focused={state.focus}
                    />
                    <button type="btn" className="btn payment-btn-submit">
                        Pay ${total}
                    </button>
                </div>

                <div className="form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="number">Card Number</label>
                            <input
                                type="tel"
                                id="number"
                                name="number"
                                placeholder="Card Number"
                                value={state.number}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                value={state.name}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className="form-group half-width">
                            <label htmlFor="expiry">Valid Thru</label>
                            <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                value={state.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className="form-group half-width">
                            <label htmlFor="cvc">CVC</label>
                            <input
                                type="tel"
                                id="cvc"
                                name="cvc"
                                placeholder="CVC"
                                value={state.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Payment;