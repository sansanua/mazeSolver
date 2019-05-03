import React, { useRef, useEffect } from 'react';
import HintItem from './HintItem';

export default ({ path, hints, currentPosition, className }) => {
    const $list = useRef(null);
    // useEffect(() => {}, []);
    const onScrollItemToTop = $item => {
        $list.current.scrollTo({
            top: $item.current.offsetTop,
            behavior: 'smooth',
        });
    };
    return (
        <div className={className} ref={$list}>
            {path.map(point => {
                return (
                    <HintItem
                        key={point}
                        point={point}
                        hints={hints}
                        currentPosition={currentPosition}
                        onScrollItemToTop={onScrollItemToTop}
                    />
                );
            })}
        </div>
    );
};
