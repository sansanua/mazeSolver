import React, { useState } from 'react';
import MapContainer from 'containers/MapContainer';
import HintContainer from 'containers/HintContainer';
import SidePanel from 'components/SidePanel';
import ripImg from 'public/images/rip.png';
import './MazeContainer.scss';

export default function MazeContainer({
    map,
    hints,
    path,
    currentPositionObserve,
    initialRotate,
    startDirection,
}) {
    const [isShowSidePanel, setIsShowSidePanel] = useState(false);
    const onSideOpen = isOpen => {
        setIsShowSidePanel(isOpen);
    };
    const isExit = !!path;

    return (
        <div className="mazeContainer">
            <div className="mazeWrapper">
                <SidePanel onOpen={onSideOpen}>
                    {isExit && (
                        <HintContainer
                            hints={hints}
                            path={path}
                            currentPositionObserve={currentPositionObserve}
                            initialRotate={initialRotate}
                            startDirection={startDirection}
                        />
                    )}
                </SidePanel>

                <div className={['mazeMainContent', isShowSidePanel ? 'sideOpen' : ''].join(' ')}>
                    {isExit ? (
                        <div className="map">
                            <div className={isShowSidePanel ? 'hide' : ''}>
                                <HintContainer
                                    small
                                    hints={hints}
                                    path={path}
                                    currentPositionObserve={currentPositionObserve}
                                    initialRotate={initialRotate}
                                    startDirection={startDirection}
                                />
                            </div>

                            <MapContainer
                                map={map}
                                path={path}
                                currentPositionObserve={currentPositionObserve}
                                startDirection={startDirection}
                                hints={hints}
                            />
                        </div>
                    ) : (
                        <div className="rip">
                            <img src={ripImg} alt="" />
                            <p>Sorry, but no exit..</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
