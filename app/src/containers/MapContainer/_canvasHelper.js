import MAP_SYMBOLS, { START_SYMBOLS } from 'constants/mapSymbols';
import { DIRECTIONS } from 'constants/directions';

const rectSize = 20;
const dotSize = rectSize / 6;
const halfRectSize = rectSize / 2;
const quarterRectSize = rectSize / 4;
let _rotate = 0;
const COLORS = {
    WALL: '#364050',
    ROAD: '#eeeeee',
    DOT: '#ff7c50',
    NAVIGATOR: '#00a05e',
};

function drawRect(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
}

function drawDot(ctx, x, y, color) {
    const _x = x * rectSize + rectSize / 2;
    const _y = y * rectSize + rectSize / 2;

    ctx.beginPath();
    ctx.arc(_x, _y, dotSize, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function initMap(ctx, map) {
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const col = map[i][j];
            const color =
                col === MAP_SYMBOLS.ROAD || START_SYMBOLS.has(col) ? COLORS.ROAD : COLORS.WALL;
            drawRect(ctx, j, i, color);
        }
    }
}

function drawPath(ctx, path) {
    path.forEach(p => {
        const [row, coll] = p;
        drawDot(ctx, coll, row, COLORS.DOT);
    });
}

function drawCurrentPosition(ctx, currentPosition, prevPosition, hints) {
    const [y, x] = currentPosition;

    if (prevPosition) {
        const [yPrev, xPrev] = prevPosition;
        const hint = hints.get(`${yPrev},${xPrev}`);

        switch (hint.action) {
            case DIRECTIONS.TURN_RIGHT:
                _rotate += 90;
                break;
            case DIRECTIONS.TURN_LEFT:
                _rotate -= 90;
                break;
            case DIRECTIONS.TURN_LEFT_X_DEGREES:
                _rotate += hint.count;
                break;
            case DIRECTIONS.TURN_RIGHT_X_DEGREES:
                _rotate += hint.count;
                break;

            default:
                break;
        }
    }

    drawCurrentPositionMarker(ctx, x, y, COLORS.NAVIGATOR, _rotate);
}

function draw(ctx, map, path, currentPosition, prevPosition, hints) {
    initMap(ctx, map);
    drawPath(ctx, path);

    if (currentPosition) {
        drawCurrentPosition(ctx, currentPosition, prevPosition, hints);
    }
}

function drawCurrentPositionMarker(ctx, x, y, fillColor, rotationDegrees) {
    var radians = (rotationDegrees * Math.PI) / 180;
    ctx.save();
    ctx.translate(x * rectSize + rectSize / 2, y * rectSize + rectSize / 2);
    ctx.rotate(radians);
    ctx.beginPath();

    ctx.moveTo(-halfRectSize, -halfRectSize);
    ctx.lineTo(halfRectSize, 0);
    ctx.lineTo(-halfRectSize, halfRectSize);
    ctx.lineTo(-quarterRectSize, 0);

    ctx.closePath();
    ctx.fillStyle = fillColor;

    ctx.fill();

    ctx.restore();
}

function setInitialRotate(startDirection) {
    switch (startDirection) {
        case MAP_SYMBOLS.START_UP:
            _rotate = -90;
            break;
        case MAP_SYMBOLS.START_RIGHT:
            _rotate = 0;
            break;
        case MAP_SYMBOLS.START_DOWN:
            _rotate = 90;
            break;
        case MAP_SYMBOLS.START_LEFT:
            _rotate = 180;
            break;

        default:
            break;
    }
}

export { setInitialRotate, draw, rectSize };
