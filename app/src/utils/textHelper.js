import TEXTS from 'constants/texts';
import { DIRECTIONS } from 'constants/directions';

const directionToTextMapper = {
    [DIRECTIONS.TURN_LEFT_X_DEGREES]: x =>
        TEXTS.TURN_LEFT_X_DEGREES.replace(/__x__/gi, Math.abs(x)),
    [DIRECTIONS.TURN_RIGHT_X_DEGREES]: x =>
        TEXTS.TURN_RIGHT_X_DEGREES.replace(/__x__/gi, Math.abs(x)),
    [DIRECTIONS.TURN_LEFT]: () => TEXTS.TURN_LEFT,
    [DIRECTIONS.TURN_RIGHT]: () => TEXTS.TURN_RIGHT,
    [DIRECTIONS.FORWARD_X]: x =>
        x === 1 ? TEXTS.FORWARD_X.replace(/__x__/gi, x) : TEXTS.FORWARDS_X.replace(/__x__/gi, x),
    [DIRECTIONS.FINISH]: () => TEXTS.FINISH,
};

export function getText(hint) {
    return directionToTextMapper[hint.action](hint.count);
}
