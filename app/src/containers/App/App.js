// https://gist.github.com/krambertech/b4e16509213fb4896fe8b97e86c63b75

import React from 'react';
import './App.css';

import Graph from 'node-dijkstra';
import MapService from 'services/mapService';
import NavigatorService from 'services/navigatorService';
import MoverService from 'services/moverService';

import MapContainer from 'containers/MapContainer';
import { parseVertex } from 'utils/graphHelper';

const getMap = () => {
    return `#########
#^     # #
##  #   #
####### #`;
};
const getMap2 = () => {
    return `#########################################
#v    #       #     #         # #   #   #
##### # ##### # ### # # ##### # # # ### #
# #   #   #   #   #   # #     #   #   # #
# # # ### # ########### # ####### # # # #
#   #   # # #       #   # #   #   # #   #
####### # # # ##### # ### # # # #########
#   #     # #     # #   #   # # #       #
# # ####### ### ### ##### ### # ####### #
# #             #   #     #   #   #   # #
# ############### ### ##### ##### # # # #
#               #     #   #   #   # #   #
##### ####### # ######### # # # ### #####
#   # #   #   # #         # # # #       #
# # # # # # ### # # ####### # # ### ### #
# # #   # # #     #   #     # #     #   #
# # ##### # # ####### # ##### ####### # #
# #     # # # #   # # #     # #       # #
# ##### ### # ### # # ##### # # ### ### #
#     #     #     #   #     #   #   #    
#########################################`;
};

function App() {
    const mapParser = new MapService(getMap2());
    const dijkstraGraphModel = mapParser.dijkstraGraphModel;

    if (!mapParser.exitPositions.length) {
        return <div>No Exit</div>;
    }

    const graph = new Graph(dijkstraGraphModel);
    const availablePaths = mapParser.exitPositions.map(exit =>
        graph.path(mapParser.startPosition, exit)
    );
    const navigatorService = new NavigatorService(availablePaths, mapParser.startDirection);
    const path = navigatorService.shortestPath.map(p => parseVertex(p));
    const mover = new MoverService(path);
    const currentPositionObserve = mover.getCurrentPositionObservable();

    // currentPositionObserve.subscribe(val => console.log(val));

    console.log(mapParser);

    return (
        <div className="App">
            <MapContainer
                map={mapParser.arrayMap}
                path={path}
                currentPositionObserve={currentPositionObserve}
            />
        </div>
    );
}

export default App;
