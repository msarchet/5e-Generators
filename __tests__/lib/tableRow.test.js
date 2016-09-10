import TableRow from '../../src/lib/tableRow'

describe('TableRow', () => {
  it('should construct correctly', () => {
    const row = new TableRow(0, 1, 'test')

    expect(row.lowerBound).toEqual(0)
    expect(row.upperBound).toEqual(1)
    expect(row.result).toEqual('test')
    expect(row.type).toEqual('result')
  })
})
