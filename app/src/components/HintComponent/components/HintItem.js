import React, { useRef } from 'react';
import { DIRECTIONS } from 'constants/directions';

const icons = {
    [DIRECTIONS.FORWARD_X]: 'F',
    [DIRECTIONS.TURN_LEFT]: 'L',
    [DIRECTIONS.TURN_RIGHT]: 'R',
    [DIRECTIONS.TURN_LEFT_X_DEGREES]: 'RL',
    [DIRECTIONS.TURN_RIGHT_X_DEGREES]: 'RR',
};

export default ({ key, hints, point, currentPosition, onScrollItemToTop }) => {
    const $item = useRef(null);
    const isSelected = currentPosition === point;
    const hint = hints.get(point);
    const icon = icons[hint.action];

    if (isSelected && $item.current) {
        console.log($item.current);
        onScrollItemToTop($item);
    }
    // debugger;

    return (
        <div key={key} ref={$item} className={['item', isSelected ? 'selected' : ''].join(' ')}>
            <span>{icon}</span>
            <span>{hint.action}</span>
        </div>
    );
};
