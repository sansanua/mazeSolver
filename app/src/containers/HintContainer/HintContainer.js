import React, { useRef, useEffect, useState } from 'react';
import MAP_SYMBOLS from 'constants/mapSymbols';
import { parseVertex } from 'utils/graphHelper';
import HintComponent from 'components/HintComponent';

export default function HintContainer({ path, hints, currentPositionObserve }) {
    const [currentPosition, setCurrentPosition] = useState(path[0].join(','));
    const _joinedPath = path.map(p => p.join(','));

    useEffect(() => {
        currentPositionObserve.subscribe(currentPosition => {
            // debugger;
            setCurrentPosition(currentPosition.join(','));
        });
    }, []);

    return <HintComponent path={_joinedPath} hints={hints} currentPosition={currentPosition} />;
}
