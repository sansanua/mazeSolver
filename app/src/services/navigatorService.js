const _findTheShortestPath = Symbol('findTheShortestPath');
const _createTipsForPath = Symbol('createTipsForPath');

class NavigationService {
    shortestWay = null;
    shortestWayWithTips = null;

    constructor(availablePaths, initialDirection) {
        this[_findTheShortestPath](availablePaths);
    }

    [_findTheShortestPath](availablePaths) {
        this.shortestWay = availablePaths.reduce(
            function(p, c) {
                return p.length > c.length ? c : p;
            },
            { length: Infinity }
        );
        console.log(this.shortestWay);
    }

    [_createTipsForPath](initialDirection) {}
}

export default NavigationService;
