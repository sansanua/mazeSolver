/**
 * @param {Number} rowIndex
 * @param {Number} colIndex
 * @returns {String}
 */
function createVertex(rowIndex, colIndex) {
    return `${rowIndex},${colIndex}`;
}
/**
 * @param {String} vertex
 * @returns {Array}
 */
function parseVertex(vertex) {
    return vertex.split(',');
}

export { createVertex, parseVertex };
