import TableStorage from '../../src/lib/loadTable'

import Table from '../../src/lib/table'

const localStorageMock = () => {
  let store = {}
  window.localStorage = {
    getItem: (key) => store[key],
    setItem: (key, value) => { store[key] = value },
    clean: store = {},
    dump: () => store
  }
}

describe('Table Storage Tests', () => {
  beforeEach(() => localStorageMock())

  it('should store a table', () => {
    let table = new Table('test')
    table.addRow(0, 0, 'row 1')
    const storage = new TableStorage()
    storage.store(table)

    const json = window.localStorage.getItem(`Table-${table.id}`)
    const stored = Table.fromJson(json)
    expect(stored.name).toEqual(table.name)
  })
})
