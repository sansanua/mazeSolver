import React, { useRef, useEffect } from 'react';
import MAP_SYMBOLS from 'constants/mapSymbols';
import { parseVertex } from 'utils/graphHelper';
const size = 10;

function drawRect(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
}

function initMap(ctx, map) {
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const col = map[i][j];
            const color = col === MAP_SYMBOLS.ROAD ? '#ffffff' : '#999999';
            drawRect(ctx, j, i, color);
        }
    }
}

function drawPath(ctx, path) {
    path.forEach(p => {
        const [rowIndex, collIndex] = p;
        drawRect(ctx, collIndex, rowIndex, '#ff00ff');
    });
}

export default function MapContainer({ map, path, currentPositionObserve }) {
    const canvas = useRef(null);

    useEffect(() => {
        if (canvas.current.getContext) {
            var ctx = canvas.current.getContext('2d');

            initMap(ctx, map);
            drawPath(ctx, path);

            currentPositionObserve.subscribe(currentPosition => {
                const [y, x] = currentPosition;
                drawRect(ctx, x, y, '#00ffff');
            });
        }
        return () => {};
    }, []);

    return (
        <div>
            <canvas ref={canvas} width="500" height="500">
                Извините, ваш браузер нет поддерживает&lt;canvas&gt; элемент.
            </canvas>
        </div>
    );
}
