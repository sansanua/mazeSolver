const MAP_SYMBOLS = Object.freeze({
    WALL: '#',
    START_UP: '^',
    START_RIGHT: '>',
    START_DOWN: 'v',
    START_LEFT: '<',
    ROAD: ' ',
});

export default MAP_SYMBOLS;

export const START_SYMBOLS = new Set([
    MAP_SYMBOLS.START_DOWN,
    MAP_SYMBOLS.START_LEFT,
    MAP_SYMBOLS.START_RIGHT,
    MAP_SYMBOLS.START_UP,
]);
