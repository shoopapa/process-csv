export declare const shiftRows: (csv: string, shift: number[]) => string;
export declare const mergeRows: (rows: string[]) => string;
export declare const processHeaders: (data: string, shift: number[]) => string;
/**
 * @param {string}  rows - an array of strings with comma separated values
 * @param {boolean[]} columnsToRemove - an array of booleans, true if the column should be removed
 */
export declare const removeColumns: (rows: string[], colsToRemove: boolean[]) => string[];
export declare const csvToObject: (csv: string) => {}[];
