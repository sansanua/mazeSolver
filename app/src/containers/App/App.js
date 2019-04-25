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
    // const route = new Graph();
    // route.addNode('01', { '02': 1, '11': 1 });
    // route.addNode('02', { '01': 1, '12': 1 });
    // route.addNode('11', { '01': 1, '12': 1 });
    // route.addNode('12', { '11': 1, '13': 1, '02': 1, '22': 1 });
    // route.addNode('13', { '12': 1, '23': 1 });
    // route.addNode('22', { '12': 1, '23': 1 });
    // route.addNode('23', { '22': 1, '13': 1 });

    // const res = route.path('01', '23');
    // console.log(res);

    const mapParser = new MapParser(getMap());

    return <div className="App">123</div>;
}

export default App;
