import React from 'react';
import icon from 'public/images/left-arrow.svg';
import './Icons.scss';

export default function Left() {
    return <img className="icon rotate180" src={icon} alt="left" />;
}
