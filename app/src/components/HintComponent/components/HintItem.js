import React, { useRef } from 'react';
import { DIRECTIONS } from 'constants/directions';
import { getText } from 'utils/textHelper';

import { Left, Right, Up, Rotate, Finish } from 'components/common/Icons';

const icons = {
    [DIRECTIONS.FORWARD_X]: () => <Up />,
    [DIRECTIONS.TURN_LEFT]: () => <Left />,
    [DIRECTIONS.TURN_RIGHT]: () => <Right />,
    [DIRECTIONS.TURN_LEFT_X_DEGREES]: (rotate, startDirection) => (
        <Rotate startDirection={startDirection} rotate={rotate} />
    ),
    [DIRECTIONS.TURN_RIGHT_X_DEGREES]: (rotate, startDirection) => (
        <Rotate startDirection={startDirection} rotate={rotate} />
    ),
    [DIRECTIONS.FINISH]: () => <Finish />,
};

export default function HintItem({
    hints,
    point,
    currentPosition,
    onScrollItemToTop,
    initialRotate,
    startDirection,
}) {
    const $item = useRef(null);
    const isSelected = currentPosition === point;
    const hint = hints.get(point);
    const icon = icons[hint.action];
    const text = getText(hint);

    if (isSelected && $item.current) {
        onScrollItemToTop($item);
    }

    return (
        <div ref={$item} className={['item', isSelected ? 'selected' : ''].join(' ')}>
            <span className="arrow">{icon(initialRotate, startDirection)}</span>
            <span className="text">{text}</span>
        </div>
    );
}
