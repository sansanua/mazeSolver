import { DIRECTIONS, REVERTED_DIRECTIONS } from 'constants/directions';
import { START_SYMBOLS } from 'constants/mapSymbols';

export function forward(x) {
    return { action: DIRECTIONS.FORWARD_X, count: x };
}

export function rotateLeft(x) {
    return { action: DIRECTIONS.TURN_LEFT_X_DEGREES, count: x };
}
export function rotateRight(x) {
    return { action: DIRECTIONS.TURN_RIGHT_X_DEGREES, count: x };
}

export function revertedTurn(direction) {
    return { action: DIRECTIONS[REVERTED_DIRECTIONS[direction]] };
}

export function finish() {
    return { action: DIRECTIONS.FINISH };
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
