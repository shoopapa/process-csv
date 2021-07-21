import {
  shiftRows,
  mergeRows,
  removeColumns,
  csvToObject
} from '../src'

//test the shiftRows function
test('shiftRows', () => {
    const input = [
      ['a', 'b', 'c'].join(','),
      ['d', 'e', 'f'].join(','),
      ['g', 'h', 'i'].join(','),
    ].join('\n')
    const expected = [
      ['','a', 'b', 'c'].join(','),
      ['','','d', 'e', 'f'].join(','),
      ['g', 'h', 'i'].join(','),
    ].join('\n')
    const result = shiftRows(input, [1, 2])
    expect(result).toEqual(expected)
})

//test the mergeRows function
test('mergeRows', () => {
  const rows = [
    ['a', 'b', 'c'].join(','),
    ['d', 'e', 'f'].join(','),
    ['g', 'h', 'i'].join(','),
  ]
  const expected = ['a_d_g', 'b_e_h', 'c_f_i'].join(',')
  const result = mergeRows(rows)
  expect(result).toEqual(expected)
})

//test the removecolumns function
test('removeColumns', () => {
  const input = [
    ['a', 'b', 'c'].join(','),
    ['d', 'e', 'f'].join(','),
    ['g', 'h', 'i'].join(','),
  ]
  const expected = [
    ['b', 'c'].join(','),
    ['e', 'f'].join(','),
    ['h', 'i'].join(','),
  ]
  const result = removeColumns(input, [true, false])
  expect(result).toEqual(expected)
})

//test the csvToObject function
test('csvToObject', () => {
  const input = [
    ['a', 'b', 'c'].join(','),
    ['d', 'e', 'f'].join(','),
    ['g', 'h', 'i'].join(','),
  ].join('\n')
  const expected = [
    { a: 'd', b: 'e', c: 'f' },
    { a: 'g', b: 'h', c: 'i' },
  ]
  const result = csvToObject(input)
  expect(result).toEqual(expected)
})