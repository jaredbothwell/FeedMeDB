import React from 'react';
import './css_files/Button.css';
import {Link} from 'react-router-dom';

// Arrays of different css classes for our buttons we're gonna use
const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

// this is same as exporting a function, but const is using arrow function
export const Button = ({
    children, // children is passed in through <Button> children </Button>, it sets the text of button
    buttonStyle,
    buttonSize,
    link
})=>{
            const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
            const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

            return(
                <Link to={link}>
                    <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}>
                        {children}
                    </button>
                </Link>
            );
};
