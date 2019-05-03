import { DIRECTIONS } from 'constants/directions';
import { parseVertex } from 'utils/graphHelper';
import {
    revertedTurn,
    forward,
    initialRotate,
    rotateLeft,
    rotateRight,
} from 'utils/directionsHelper';
import TEXTS from 'constants/texts';
import MAP_SYMBOLS from 'constants/mapSymbols';

const _findTheShortestPath = Symbol('findTheShortestPath');
const _createHintsForPath = Symbol('createHintsForPath');

class NavigationService {
    shortestPath = null;
    shortestPathWithHints = new Map();
    initialRotate = null;

    constructor(availablePaths, initialDirection) {
        this[_findTheShortestPath](availablePaths);
        this[_createHintsForPath](initialDirection);
        console.log(this.shortestPath);
    }

    [_findTheShortestPath](availablePaths) {
        if (availablePaths.length === 0) {
            this.shortestPath = availablePaths[0];
            return;
        }

        this.shortestPath = availablePaths.reduce(
            function(p, c) {
                return p.length > c.length ? c : p;
            },
            { length: Infinity }
        );
    }

    [_createHintsForPath](initialDirection) {
        let forwardX = 1;
        let forwardY = 1;
        let prevRowIndex = null;
        let prevCollIndex = null;

        const lastIndex = this.shortestPath.length - 1;
        for (let i = lastIndex; i >= 0; i--) {
            const currentStep = this.shortestPath[i];
            const [currRowIndex, currCollIndex] = parseVertex(currentStep);

            if (i === 0) {
                // start point
                let expectationDirection = '';

                if (currRowIndex !== prevRowIndex) {
                    expectationDirection =
                        currRowIndex < prevRowIndex ? MAP_SYMBOLS.START_DOWN : MAP_SYMBOLS.START_UP;
                } else if (currCollIndex !== prevCollIndex) {
                    expectationDirection =
                        currCollIndex < prevCollIndex
                            ? MAP_SYMBOLS.START_RIGHT
                            : MAP_SYMBOLS.START_LEFT;
                }

                const angle = initialRotate(initialDirection, expectationDirection);
                this.initialRotate = angle;

                if (angle === 0) {
                    const _forward = forwardY || forwardX || 1;
                    this.shortestPathWithHints.set(currentStep, forward(_forward));
                } else {
                    this.shortestPathWithHints.set(
                        currentStep,
                        angle > 0 ? rotateRight(angle) : rotateLeft(angle)
                    );
                }

                console.log(expectationDirection);
            } else if (i === lastIndex) {
                this.shortestPathWithHints.set(currentStep, TEXTS.FINISH);
            } else {
                const nextStep = this.shortestPath[i - 1];
                const [nextRowIndex, nextCollIndex] = parseVertex(nextStep);
                let hint = null;

                if (currRowIndex !== nextRowIndex) {
                    forwardX = 0;
                    if (forwardY) {
                        hint = forward(forwardY);
                    } else {
                        if (nextRowIndex > currRowIndex) {
                            hint =
                                prevCollIndex < nextCollIndex
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        } else {
                            hint =
                                prevCollIndex > nextCollIndex
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        }
                    }
                    forwardY++;
                } else if (currCollIndex !== nextCollIndex) {
                    forwardY = 0;
                    if (forwardX) {
                        hint = forward(forwardX);
                    } else {
                        if (nextCollIndex > currCollIndex) {
                            hint =
                                prevRowIndex > nextRowIndex
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        } else {
                            hint =
                                prevRowIndex < nextRowIndex
                                    ? revertedTurn(DIRECTIONS.TURN_RIGHT)
                                    : revertedTurn(DIRECTIONS.TURN_LEFT);
                        }
                    }
                    forwardX++;
                }
                prevCollIndex = currCollIndex;
                prevRowIndex = currRowIndex;

                this.shortestPathWithHints.set(currentStep, hint);
            }
        }

        console.log(this.shortestPathWithHints);
    }
}

export default NavigationService;
