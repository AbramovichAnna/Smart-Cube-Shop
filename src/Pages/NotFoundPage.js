import './NotFoundPage.css';
import React from 'react';

function NotFoundPage() {
    const handleGoBack = () => {
        window.history.back(); // This will navigate back to the previous page in the browser history.
    };

    return (
        <div className="not-found-container">
            <div className="not-found-text">
                <h1>404</h1>
                <h1>Oops!</h1>
                <h2>Page Not Found</h2>
                <p>It seems you've reached a dead-end, just like a tricky corner on a Rubik's Cube.</p>
                    <p> The page you seek is lost in the twists and turns.</p>
                <button onClick={() => window.location.href = '/'} style={{marginRight: "50px"}}>Home</button>
                <button onClick={handleGoBack}>Back</button>
            </div>
            <div className="not-found-image">
                <span className="faded faded-all">
                    <img src="images/nopage-bg.png" alt="404" />
                </span>
            </div>
        </div>
    );
}

export default NotFoundPage;
