"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToObject = exports.removeColumns = exports.processHeaders = exports.mergeRows = exports.shiftRows = void 0;
var shiftRows = function (csv, shift) {
    var rows = csv.split('\n');
    var firstNRows = rows.slice(0, shift.length);
    var lastRows = rows.slice(shift.length);
    shift.forEach(function (len, i) {
        var commas = ','.repeat(len);
        firstNRows[i] = commas + firstNRows[i];
    });
    return __spreadArray(__spreadArray([], firstNRows), lastRows).join('\n');
};
exports.shiftRows = shiftRows;
var mergeRows = function (rows) {
    var nxmCells = rows.map(function (row) { return row.split(','); });
    var firstRowCells = nxmCells.shift();
    var nxmCellsJoined = nxmCells.reduce(function (a, b) {
        return a.map(function (a2, i) {
            if (b[i] && a2) {
                return a2 + "_" + b[i];
            }
            else if (b[i]) {
                return b[i];
            }
            else {
                return '';
            }
        });
    }, firstRowCells);
    var finalRow = nxmCellsJoined.join(',');
    return finalRow;
};
exports.mergeRows = mergeRows;
var processHeaders = function (data, shift) {
    if (shift.length === 0)
        return data;
    var shiftedCsv = exports.shiftRows(data, shift);
    var headers = shiftedCsv.split('\n').slice(0, shift.length);
    var finalHeader = exports.mergeRows(headers);
    var rows = data.split('\n').slice(shift.length);
    var finalRows = __spreadArray([finalHeader], rows);
    var selectedRows = exports.removeColumns(finalRows, [false]);
    var finalCsv = selectedRows.join('\n');
    return finalCsv;
};
exports.processHeaders = processHeaders;
/**
 * @param {string}  rows - an array of strings with comma separated values
 * @param {boolean[]} columnsToRemove - an array of booleans, true if the column should be removed
 */
var removeColumns = function (rows, colsToRemove) {
    var cells = rows.map(function (row) { return row.split(','); });
    var trueCol = (new Array(cells[0].length - colsToRemove.length)).fill(true);
    colsToRemove = colsToRemove.map(function (col) { return !col; });
    colsToRemove = colsToRemove.concat(trueCol);
    var newRows = cells.map(function (row) {
        var newRow = row.filter(function (_, i) { return colsToRemove[i] === true; });
        return newRow.join(',');
    });
    return newRows;
};
exports.removeColumns = removeColumns;
var csvToObject = function (csv) {
    var rows = csv.split('\n').map(function (row) {
        return row.split(',');
    });
    var header = rows.shift();
    var objectRow = rows.map(function (row) {
        var newRow = {};
        row.forEach(function (cell, i) {
            newRow[header[i]] = cell;
        });
        return newRow;
    });
    return objectRow;
};
exports.csvToObject = csvToObject;
