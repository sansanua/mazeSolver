import React from 'react';
import './App.css';

import Graph from 'node-dijkstra';

import MapParser from 'services/mapParser';

const getMap = () => {
    return `#########
#>#   # #
#   #   #
####### #`;
};
// console.log(getMap().split('\n'));

function App() {
    const route2 = new Graph();
    route2.addNode('01', { '02': 1, '11': 1 });
    route2.addNode('02', { '01': 1, '12': 1 });
    route2.addNode('11', { '01': 1, '12': 1 });
    route2.addNode('12', { '11': 1, '13': 1, '02': 1, '22': 1 });
    route2.addNode('13', { '12': 1, '23': 1 });
    route2.addNode('22', { '12': 1, '23': 1 });
    route2.addNode('23', { '22': 1, '13': 1 });

    const res = route2.path('01', '23');
    console.log(res);

    const mapParser = new MapParser(getMap());
    const dijkstraGraphModel = mapParser.getDijkstraGraphModel();

    const route = new Graph(dijkstraGraphModel);
    debugger;
    let a = route.path('2,1', mapParser._exitPositions[0]);
    console.log(a);
    return <div className="App">{a.join('->')}</div>;
}

export default App;
