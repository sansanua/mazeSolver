//@ts-check
import MAP_SYMBOLS, { START_SYMBOLS } from 'constants/mapSymbols';
import { createVertex } from 'utils/graphHelper';

const defaultWeight = 1;

const _convertMapToDijkstraGraphModel = Symbol('convertMapToDijkstraGraphModel');
const _getMapPresentedInArrayFormat = Symbol('getMapPresentedInArrayFormat');
const _prepareDijkstraGraphModel = Symbol('prepareDijkstraGraphModel');
const _findNeighborsLink = Symbol('findNeighborsLink');

class MapService {
    originMap = null;
    arrayMap = null;
    mapWidth = null;
    mapHeight = null;
    exitPositions = [];
    startPosition = null;
    startDirection = null;
    dijkstraGraphModel = {};

    /**
     *Creates an instance of MapParser.
     * @param {String} map
     * @memberof MapParser
     */
    constructor(map) {
        this.originMap = map;

        this[_getMapPresentedInArrayFormat]();
        this[_convertMapToDijkstraGraphModel]();
    }

    /**
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @returns {Boolean}
     */
    isRoad(rowIndex, colIndex) {
        return this.arrayMap[rowIndex][colIndex] === MAP_SYMBOLS.ROAD;
    }

    /**
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @returns {Boolean}
     */
    isWall(rowIndex, colIndex) {
        return this.arrayMap[rowIndex][colIndex] === MAP_SYMBOLS.WALL;
    }

    /**
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @returns {Boolean}
     */
    isStartCell(rowIndex, colIndex) {
        return !this.startPosition && START_SYMBOLS.has(this.arrayMap[rowIndex][colIndex]);
    }

    /**
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @returns {Boolean}
     */
    isExitCell(rowIndex, colIndex) {
        return (
            (rowIndex === 0 || colIndex === 0 || rowIndex === this.mapHeight - 1 || colIndex === this.mapWidth - 1) &&
            this.arrayMap[rowIndex][colIndex] === MAP_SYMBOLS.ROAD
        );
    }

    [_getMapPresentedInArrayFormat]() {
        this.arrayMap = this.originMap.split('\n');
        this.mapWidth = this.arrayMap[0].length;
        this.mapHeight = this.arrayMap.length;
    }

    [_convertMapToDijkstraGraphModel]() {
        for (let rowIndex = 0; rowIndex < this.mapHeight; rowIndex++) {
            for (let colIndex = 0; colIndex < this.mapWidth; colIndex++) {
                if (this.isWall(rowIndex, colIndex)) {
                    continue;
                } else {
                    this[_prepareDijkstraGraphModel](rowIndex, colIndex);
                }
            }
        }
    }

    [_prepareDijkstraGraphModel](rowIndex, colIndex) {
        const res = this[_findNeighborsLink](rowIndex, colIndex);
        this.dijkstraGraphModel[createVertex(rowIndex, colIndex)] = { ...res };
    }

    [_findNeighborsLink](rowIndex, colIndex) {
        const neighborsLink = {};

        const neighborPositions = {
            left: colIndex - 1 >= 0 ? [rowIndex, colIndex - 1] : null,
            right: colIndex + 1 < this.mapWidth ? [rowIndex, colIndex + 1] : null,
            up: rowIndex - 1 >= 0 ? [rowIndex - 1, colIndex] : null,
            down: rowIndex + 1 < this.mapHeight ? [rowIndex + 1, colIndex] : null,
        };

        for (const neighbor in neighborPositions) {
            if (!neighborPositions[neighbor]) {
                continue;
            }

            const [rowIndex, colIndex] = neighborPositions[neighbor];

            if (this.isWall(rowIndex, colIndex)) {
                continue;
            } else if (this.isExitCell(rowIndex, colIndex)) {
                this.exitPositions.push(createVertex(rowIndex, colIndex));
            } else if (this.isStartCell(rowIndex, colIndex)) {
                this.startPosition = createVertex(rowIndex, colIndex);
                this.startDirection = this.arrayMap[rowIndex][colIndex];
            }
            neighborsLink[createVertex(rowIndex, colIndex)] = defaultWeight;
        }

        return neighborsLink;
    }
}

export default MapService;
