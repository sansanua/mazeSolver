import React, { useRef } from 'react';
import HintItem from './HintItem';

export default ({ path, hints, currentPosition, className, initialRotate, startDirection }) => {
    const $list = useRef(null);

    const onScrollItemToTop = $item => {
        $list.current.scrollTo({
            top: $item.current.offsetTop - 3,
            behavior: 'smooth',
        });
    };
    return (
        <div className={className} ref={$list}>
            {path.map(point => {
                return (
                    <div key={point}>
                        <HintItem
                            point={point}
                            hints={hints}
                            currentPosition={currentPosition}
                            onScrollItemToTop={onScrollItemToTop}
                            initialRotate={initialRotate}
                            startDirection={startDirection}
                        />
                    </div>
                );
            })}
        </div>
    );
};
