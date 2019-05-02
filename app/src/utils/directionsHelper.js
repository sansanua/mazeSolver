import TEXTS from 'constants/texts';
import { DIRECTIONS, REVERTED_DIRECTIONS } from 'constants/directions';

export function forward(x) {
    return TEXTS.FORWARD_X.replace(/__x__/gi, x);
}

export function revertedTurn(direction) {
    // return direction;
    return TEXTS[DIRECTIONS[REVERTED_DIRECTIONS[direction]]];
}
