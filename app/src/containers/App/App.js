// https://gist.github.com/krambertech/b4e16509213fb4896fe8b97e86c63b75

import React from 'react';
import './App.scss';

import Graph from 'node-dijkstra';
import MapService from 'services/mapService';
import NavigatorService from 'services/navigatorService';
import MoverService from 'services/moverService';
import MazeContainer from 'containers/MazeContainer';
import { parseVertex } from 'utils/graphHelper';
import MAPS from 'constants/defaultMaps';

function App() {
    const mapService = new MapService(MAPS.M);
    let navigatorService = null;
    let path = null;
    let currentPositionObserve = null;

    if (mapService.exitPositions.length) {
        const dijkstraGraphModel = mapService.dijkstraGraphModel;

        const graph = new Graph(dijkstraGraphModel);
        const availablePaths = mapService.exitPositions.map(exit =>
            graph.path(mapService.startPosition, exit)
        );
        navigatorService = new NavigatorService(availablePaths, mapService.startDirection);
        path = navigatorService.shortestPath.map(p => parseVertex(p));
        const mover = new MoverService(path);
        currentPositionObserve = mover.getCurrentPositionObservable();
    }

    return (
        <>
            <MazeContainer
                hints={navigatorService && navigatorService.shortestPathWithHints}
                path={path}
                currentPositionObserve={currentPositionObserve}
                initialRotate={navigatorService && navigatorService.initialRotate}
                startDirection={mapService && mapService.startDirection}
                map={mapService && mapService.arrayMap}
            />
        </>
    );
}

export default App;
