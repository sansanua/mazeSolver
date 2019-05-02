import { DIRECTIONS } from 'constants/directions';
import { parseVertex } from 'utils/graphHelper';
import { revertedTurn, forward } from 'utils/directionsHelper';

const _findTheShortestPath = Symbol('findTheShortestPath');
const _createTipsForPath = Symbol('createTipsForPath');

class NavigationService {
    shortestWay = null;
    shortestWayWithTips = new Map();

    constructor(availablePaths, initialDirection) {
        this[_findTheShortestPath](availablePaths);
        this[_createTipsForPath](initialDirection);
        console.log(this.shortestWay);
    }

    [_findTheShortestPath](availablePaths) {
        if (availablePaths.length === 0) {
            this.shortestWay = availablePaths[0];
            return;
        }

        this.shortestWay = availablePaths.reduce(
            function(p, c) {
                return p.length > c.length ? c : p;
            },
            { length: Infinity }
        );
    }

    [_createTipsForPath](initialDirection) {
        let forwardX = 1;
        let forwardY = 1;
        let _prevRow = null;
        let _prevColl = null;

        for (let i = this.shortestWay.length - 1; i >= 0; i--) {
            const currentStep = this.shortestWay[i];
            // console.log(currentStep)

            const [currRowI, currCollI] = parseVertex(currentStep);

            if (i > 0) {
                const nextStep = this.shortestWay[i - 1];
                const [nextRowI, nextCollI] = parseVertex(nextStep);
                let tip = null;

                if (currRowI !== nextRowI) {
                    forwardX = 0;
                    if (forwardY) {
                        tip = forward(forwardY);
                    } else {
                        if (nextRowI > currRowI) {
                            tip =
                                _prevColl < nextCollI
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        } else {
                            tip =
                                _prevColl > nextCollI
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        }
                    }
                    forwardY++;
                } else if (currCollI !== nextCollI) {
                    forwardY = 0;
                    if (forwardX) {
                        tip = forward(forwardX);
                    } else {
                        if (nextCollI > currCollI) {
                            tip =
                                _prevRow > nextRowI
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        } else {
                            tip =
                                _prevRow < nextRowI
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        }
                    }
                    forwardX++;
                }
                _prevColl = currCollI;
                _prevRow = currRowI;
                // console.log(tip)
                this.shortestWayWithTips.set(nextStep, tip);
            }
        }
        console.log(this.shortestWayWithTips);
    }
}

export default NavigationService;
