// https://gist.github.com/krambertech/b4e16509213fb4896fe8b97e86c63b75

import React from 'react';
import './App.css';

import Graph from 'node-dijkstra';
import MapService from 'services/mapService';
import NavigatorService from 'services/navigatorService';

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
    const mapParser = new MapService(getMap());
    const dijkstraGraphModel = mapParser.dijkstraGraphModel;

    if (!mapParser.exitPositions.length) {
        return <div>No Exit</div>;
    }

    const route = new Graph(dijkstraGraphModel);

    const availablePaths = [];
    mapParser.exitPositions.forEach(exit => availablePaths.push(route.path(mapParser.startPosition, exit)));

    let a = route.path(mapParser.startPosition, mapParser.exitPositions[0]);

    const solveMap = [...mapParser.arrayMap];
    a.forEach(r => {
        const [ri, ci] = r.split(',');

        solveMap[parseInt(ri)] = solveMap[parseInt(ri)].split('');

        solveMap[parseInt(ri)][parseInt(ci)] = '.';
        solveMap[parseInt(ri)] = solveMap[parseInt(ri)].join('');
    });
    console.log(solveMap);
    const navigatorService = new NavigatorService(availablePaths, mapParser.startDirection);
    return <div className="App">{a.join('->')}</div>;
}

export default App;
