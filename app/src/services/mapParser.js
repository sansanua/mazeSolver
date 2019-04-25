class MapParser {
    /**
     *Creates an instance of MapParser.
     * @param {String} map
     * @memberof MapParser
     */
    constructor(map) {
        this._originMap = map;

        this.convertMapToDijkstraGraphModel();
    }

    getMapPresentedInArrayFormat() {
        return this._originMap.split('\n');
    }

    convertMapToDijkstraGraphModel() {
        const map = this.getMapPresentedInArrayFormat();
        console.log(map);

        const mapWidth = map[0].length;
        const mapHeight = map.length;
        const dijkstraGraphModel = {};

        const exitsPositions = [];
        let startPosition = null;

        for (let rowIndex = 0; rowIndex < mapHeight; rowIndex++) {
            for (let collIndex = 0; collIndex < mapWidth; collIndex++) {
                const slot = map[rowIndex][collIndex];
            }
        }
    }

    getMapPresentedInDijkstraGraphModelFormat() {}
}

export default MapParser;
