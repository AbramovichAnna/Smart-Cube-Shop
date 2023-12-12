import React from 'react';
import './ScrollToTopButton.css';
import { TbArrowBigUpLinesFilled } from "react-icons/tb";
import { useState, useEffect } from 'react';


const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const shouldBeVisible = window.scrollY > 70;
            if (shouldBeVisible && !isVisible) {
                setIsVisible(true);
            } else if (!shouldBeVisible && isVisible) {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <button onClick={scrollToTop} className="scroll-to-top">
                {/* <h6 className="scroll-to-top-text">Top</h6> */}
                <TbArrowBigUpLinesFilled />
            </button>
        )
    );
};

export default ScrollToTopButton;
