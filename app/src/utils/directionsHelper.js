import TEXTS from 'constants/texts';
import { DIRECTIONS, REVERTED_DIRECTIONS } from 'constants/directions';
import { START_SYMBOLS } from 'constants/mapSymbols';

export function forward(x) {
    return TEXTS.FORWARD_X.replace(/__x__/gi, x);
}

export function rotateLeft(x) {
    return TEXTS.TURN_LEFT_X_DEGREES.replace(/__x__/gi, x);
}
export function rotateRight(x) {
    return TEXTS.TURN_RIGHT_X_DEGREES.replace(/__x__/gi, x);
}

export function revertedTurn(direction) {
    // return direction;
    return TEXTS[DIRECTIONS[REVERTED_DIRECTIONS[direction]]];
}

export function initialRotate(startDirection, finishDirection) {
    let angle = 0;
    if (startDirection === finishDirection) {
        return 0;
    }
    const _START_SYMBOLS = [...START_SYMBOLS];
    angle = _START_SYMBOLS.indexOf(startDirection) - _START_SYMBOLS.indexOf(finishDirection);

    return angle * -90;
}
