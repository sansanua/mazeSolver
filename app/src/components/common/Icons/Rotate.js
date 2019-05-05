import React from 'react';
import icon from 'public/images/swirly-arrow.svg';
import './Icons.scss';
import MAP_SYMBOLS from 'constants/mapSymbols';

const initialIcons = {
    [MAP_SYMBOLS.START_UP]: <img className="icon rotate-90" src={icon} alt="" />,
    [MAP_SYMBOLS.START_RIGHT]: <img className="icon" src={icon} alt="" />,
    [MAP_SYMBOLS.START_DOWN]: <img className="icon rotate90" src={icon} alt="" />,
    [MAP_SYMBOLS.START_LEFT]: <img className="icon rotate180" src={icon} alt="" />,
};

export default function Rotate({ rotate, startDirection }) {
    const _icon = initialIcons[startDirection];
    const style = {
        transform: `rotate(${rotate}deg)`,
    };

    return <div style={style}>{_icon}</div>;
}
