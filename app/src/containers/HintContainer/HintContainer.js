/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import HintComponent from 'components/HintComponent';

export default function HintContainer({
    path,
    hints,
    currentPositionObserve,
    initialRotate,
    startDirection,
    small = false,
}) {
    const [currentPosition, setCurrentPosition] = useState(path[0].join(','));
    const _joinedPath = path.map(p => p.join(','));

    useEffect(() => {
        currentPositionObserve.subscribe(positions => {
            const [, currentPosition] = positions;
            setCurrentPosition(currentPosition.join(','));
        });
    }, []);

    return (
        <HintComponent
            small={small}
            path={_joinedPath}
            hints={hints}
            currentPosition={currentPosition}
            initialRotate={initialRotate}
            startDirection={startDirection}
        />
    );
}
