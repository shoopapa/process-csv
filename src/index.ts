export const shiftRows = (csv:string, shift:number[]) => {
  const rows = csv.split('\n')
  const firstNRows = rows.slice(0, shift.length)
  const lastRows = rows.slice(shift.length)
  shift.forEach((len,i) => {
    const commas = ','.repeat(len)
    firstNRows[i] = commas + firstNRows[i]
  })
  return [...firstNRows, ...lastRows].join('\n')
}

export const mergeRows = (rows:string[]) => {
  const nxmCells = rows.map(row => row.split(','))
  const firstRowCells = nxmCells.shift()
  const nxmCellsJoined = nxmCells.reduce((a, b) => {
    return a.map((a2, i) => {
      if (b[i] && a2) {
        return `${a2}_${b[i]}`
      } else if (b[i]) {
        return b[i]
      } else {
        return ''
      }
    })
  }, firstRowCells)
  const finalRow = nxmCellsJoined.join(',')
  return finalRow
}

export const processHeaders = (data:string, shift:number[]) => {
  if (shift.length === 0) return data
  const shiftedCsv = shiftRows(data, shift)
  const headers = shiftedCsv.split('\n').slice(0, shift.length)
  // const finalHeader = mergeRows(headers)
  const finalHeader:string = [
    '',
    'Started Date',
    'Context Campaign Source',
    'Context Campaign Medium',
    'Context Campaign Name',
    'Context Campaign Content',
    'Context Campaign Term',
    'One Campaign ID',
    'One Adset ID',
    'One Ad ID',
    'Application_Approved_NotFunded [Looker]',
    'Application_Approved_Funded [Looker]',
    'Application_Denied_NotFunded [Looker]',
    'Application_Pending_NotFunded [Looker]',
    'Application_Pending_Funded [Looker]',
    'Application_Count [Looker]',
  ].join(',')
  const rows = data.split('\n').slice(shift.length) 
  const finalRows = [finalHeader, ...rows]
  const selectedRows = removeColumns(finalRows, [false])
  const finalCsv = selectedRows.join('\n')
  return finalCsv
}

/**
 * 
 * @param {string}  rows - an array of strings with comma separated values
 * @param {boolean[]} columnsToRemove - an array of booleans, true if the column should be removed
 */
export const removeColumns = (rows: string[], colsToRemove: boolean[]):string[] => {
  const cells = rows.map(row => row.split(','))
  const trueCol: boolean[] = (new Array(cells[0].length - colsToRemove.length)).fill(true)
  colsToRemove = colsToRemove.map(col => !col)
  colsToRemove = colsToRemove.concat(trueCol)
  const newRows = cells.map(row => {
    const newRow = row.filter((_, i) => colsToRemove[i] === true)
    return newRow.join(',')
  })
  return newRows
}

export const csvToObject = (csv:string) => {
  const rows = csv.split('\n').map(row=>{
    return row.split(',')
  })

  const header = rows.shift()
  const objectRow = rows.map(row=>{
    const newRow = {}
    row.forEach((cell,i)=>{
      newRow[header[i]] = cell
    })
    return newRow
  })
  return objectRow
}