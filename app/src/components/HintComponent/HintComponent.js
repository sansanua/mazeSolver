import React, { useEffect } from 'react';
import './HintComponent.scss';
import HintList from './components/HintList';

export default function HintComponent({
    path,
    hints,
    currentPosition,
    initialRotate,
    startDirection,
    small,
}) {
    useEffect(() => {}, []);

    return (
        <div className={['hintComponent', small ? 'small' : ''].join(' ')}>
            <HintList
                className="list"
                path={path}
                hints={hints}
                currentPosition={currentPosition}
                initialRotate={initialRotate}
                startDirection={startDirection}
            />
        </div>
    );
}
