/**
* BackToTopButton javascript
* @author Thai Duy Bao
* filename: BackToTopButton.js
* since 2023
*/
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import "../css/BackToTopButton.css";
const BackToTopButton = () => {

    const [isVisible, setIsVisible] = useState(false);

    // Scroll event listener to show/hide the button
    const handleScroll = () => {

        if (window.scrollY >300) {

            setIsVisible(true);
        } else {

            setIsVisible(false);
        }
    };

    useEffect( () => {

        // add Event Scroll
        window.addEventListener("scroll", handleScroll);
        
        return () => {

            //remove Event Scroll
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    // return Html
    return (
        <button
          className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
          onClick={scrollToTop}
        >
            <FontAwesomeIcon icon={faAngleUp} />
        </button>
    );
};

export default BackToTopButton;