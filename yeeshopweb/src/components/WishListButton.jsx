/**
* WishListButton javascript
* @author Thai Duy Bao
* filename: WishListButton.js
* since 2023
*/

import React from "react";
import "../css/WishListButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const WishListButton = () => {

    // return Html
    return (
        <a href="/wishlist" className="wish-list-button link">

            <FontAwesomeIcon icon={faHeart} className="color-primary" size="lg"/>
        </a>
    );

};

export default WishListButton;