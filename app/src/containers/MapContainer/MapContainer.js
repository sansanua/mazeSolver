/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useMemo } from 'react';
import { draw, rectSize, setInitialRotate } from './_canvasHelper';
import './MapContainer.scss';

export default function MapContainer({ map, path, currentPositionObserve, hints, startDirection }) {
    const $canvas = useRef(null);
    const containerWidth = useMemo(() => map[0].length * rectSize, [map]);
    const containerHeight = useMemo(() => map.length * rectSize, [map]);
    const style = {
        height: `${containerHeight}px`,
    };

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

    return (
        <div className="mapContainer" style={style}>
            <canvas ref={$canvas} />
        </div>
    );
}
