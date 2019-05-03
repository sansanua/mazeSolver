import React, { useRef, useEffect } from 'react';
import MAP_SYMBOLS from 'constants/mapSymbols';
import { parseVertex } from 'utils/graphHelper';
import './HintComponent.scss';
import HintList from './components/HintList';

export default function HintComponent({ path, hints, currentPosition }) {
    useEffect(() => {}, []);

    return (
        <div className={'hintComponent'}>
            <HintList
                className="list"
                path={path}
                hints={hints}
                currentPosition={currentPosition}
            />
        </div>
    );
}
