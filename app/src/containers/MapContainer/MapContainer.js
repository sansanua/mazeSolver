/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useMemo } from 'react';
import MAP_SYMBOLS, { START_SYMBOLS } from 'constants/mapSymbols';
import './MapContainer.scss';
import _navigationImage from 'public/images/nav.png';
import { DIRECTIONS } from 'constants/directions';

const rectSize = 20;
const dotSize = rectSize / 5;
const halfRectSize = rectSize / 2;
const quarterRectSize = rectSize / 4;
const navigationImage = new Image();
navigationImage.src = _navigationImage;
let _rotate = 0;

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
                col === MAP_SYMBOLS.ROAD || START_SYMBOLS.has(col) ? '#eeeeee' : '#393e46';
            drawRect(ctx, j, i, color);
        }
    }
}

function drawPath(ctx, path) {
    path.forEach(p => {
        const [row, coll] = p;
        drawDot(ctx, coll, row, '#ff7c50');
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

    drawCurrentPositionMarker(ctx, x, y, '#999', _rotate);
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

export default function MapContainer({ map, path, currentPositionObserve, hints, startDirection }) {
    const $canvas = useRef(null);
    const containerWidth = useMemo(() => map[0].length * rectSize, [map]);
    const containerHeight = useMemo(() => map.length * rectSize, [map]);

    useEffect(() => {
        setInitialRotate(startDirection);

        if ($canvas.current.getContext) {
            const ctx = $canvas.current.getContext('2d');

            ctx.canvas.width = containerWidth;
            ctx.canvas.height = containerHeight;

            draw(ctx, map, path, path[0], null, hints);
            currentPositionObserve.subscribe(positions => {
                const [prevPosition, currentPosition] = positions;
                draw(ctx, map, path, currentPosition, prevPosition, hints);
            });
        }
    }, []);

    useEffect(() => {});

    const style = {
        height: `${containerHeight}px`,
        // width: `${containerWidth - 80}px`,
    };

    return (
        <div className="mapContainer" style={style}>
            <canvas ref={$canvas} />
        </div>
    );
}
