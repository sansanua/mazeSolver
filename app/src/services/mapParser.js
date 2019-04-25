import MAP_SYMBOLS, { START_SYMBOLS } from 'constants/mapSymbols';
const defaultWeight = 1;

class MapParser {
    _originMap = null;
    _arrayMap = null;
    _mapWidth = null;
    _mapHeight = null;
    _exitPositions = [];
    _startPosition = null;
    _dijkstraGraphModel = {};

    /**
     *Creates an instance of MapParser.
     * @param {String} map
     * @memberof MapParser
     */
    constructor(map) {
        this._originMap = map;

        this._convertMapToDijkstraGraphModel();
    }

    getDijkstraGraphModel() {
        return this._dijkstraGraphModel;
    }

    _getMapPresentedInArrayFormat() {
        this._arrayMap = this._originMap.split('\n');
        this._mapWidth = this._arrayMap[0].length;
        this._mapHeight = this._arrayMap.length;

        return this._arrayMap;
    }

    _convertMapToDijkstraGraphModel() {
        const map = this._getMapPresentedInArrayFormat();
        console.log(map);

        for (let rowIndex = 0; rowIndex < this._mapHeight; rowIndex++) {
            for (let colIndex = 0; colIndex < this._mapWidth; colIndex++) {
                if (this._isWall(rowIndex, colIndex)) {
                    continue;
                } else if (this._isExitCell(rowIndex, colIndex)) {
                    this._exitPositions.push(this._createVertex(rowIndex, colIndex));
                    const lineToEnd = { [this._createVertex(rowIndex, colIndex - 1)]: defaultWeight }; //TODO: rename

                    if (rowIndex === 0) {
                        this._dijkstraGraphModel[this._createVertex(rowIndex + 1, colIndex)] = lineToEnd;
                    }
                    if (rowIndex === this._mapHeight) {
                        this._dijkstraGraphModel[this._createVertex(rowIndex - 1, colIndex)] = lineToEnd;
                    }
                    if (colIndex === 0) {
                        this._dijkstraGraphModel[this._createVertex(rowIndex, colIndex + 1)] = lineToEnd;
                    }
                    if (rowIndex === this._mapWidth) {
                        this._dijkstraGraphModel[this._createVertex(rowIndex, colIndex - 1)] = lineToEnd;
                    }
                } else if (this._isStartCell(rowIndex, colIndex)) {
                    this._startPosition = this._createVertex(rowIndex, colIndex);
                } else {
                    this._prepareDijkstraGraphModel(rowIndex, colIndex);
                }
            }
        }

        console.log(this._exitPositions);
        console.log(this._startPosition);
        console.log(this._dijkstraGraphModel);
    }

    _prepareDijkstraGraphModel(rowIndex, colIndex) {
        const res = {};
        if (this._isRoad(rowIndex, colIndex - 1)) {
            res[this._createVertex(rowIndex, colIndex - 1)] = defaultWeight;
        }
        if (this._isRoad(rowIndex, colIndex + 1)) {
            res[this._createVertex(rowIndex, colIndex + 1)] = defaultWeight;
        }
        if (this._isRoad(rowIndex - 1, colIndex)) {
            res[this._createVertex(rowIndex - 1, colIndex)] = defaultWeight;
        }
        if (this._isRoad(rowIndex + 1, colIndex)) {
            res[this._createVertex(rowIndex + 1, colIndex)] = defaultWeight;
        }
        const ss = this._dijkstraGraphModel[this._createVertex(rowIndex, colIndex)];
        this._dijkstraGraphModel[this._createVertex(rowIndex, colIndex)] = { ...ss, ...res };
    }
    _isRoad(rowIndex, colIndex) {
        return this._arrayMap[rowIndex][colIndex] === MAP_SYMBOLS.ROAD;
    }
    _isWall(rowIndex, colIndex) {
        return this._arrayMap[rowIndex][colIndex] === MAP_SYMBOLS.WALL;
    }

    _isStartCell(rowIndex, colIndex) {
        return !this._startPosition && START_SYMBOLS.has(this._arrayMap[rowIndex][colIndex]);
    }

    _isExitCell(rowIndex, colIndex) {
        return (
            (rowIndex === 0 || colIndex === 0 || rowIndex === this._mapHeight - 1 || colIndex === this._mapWidth - 1) &&
            this._arrayMap[rowIndex][colIndex] === MAP_SYMBOLS.ROAD
        );
    }
    _createVertex(rowIndex, colIndex) {
        return `${rowIndex},${colIndex}`;
    }
}

export default MapParser;
