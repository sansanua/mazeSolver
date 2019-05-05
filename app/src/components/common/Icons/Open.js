import React from 'react';
import icon from 'public/images/openArrow.svg';
import './Icons.scss';

export default function Rotate({ rotate, startDirection }) {
    const style = {
        transform: `rotate(${rotate}deg)`,
    };

    return (
        <div style={style}>
            <img className="icon" src={icon} alt="" />
        </div>
    );
}
