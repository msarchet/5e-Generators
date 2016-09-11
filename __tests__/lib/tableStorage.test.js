import TableStorage from '../../src/lib/loadTable'

import Table from '../../src/lib/table'

const localStorageMock = () => {
  let store = {}
  window.localStorage = {
    getItem: (key) => store[key],
    setItem: (key, value) => { store[key] = JSON.stringify(value); console.log('store', store)},
    clean: store = {}
  }
}

describe('Table Storage Tests', () => {
  beforeEach(() => localStorageMock())

  it('should store a table', () => {
    let table = new Table('test')
    table.addRow(0, 0, 'row 1')
    const storage = new TableStorage()
    storage.store(table.name, table)

    console.log(window.localStorage.getItem(table.name))
    expect(window.localStorage.getItem(table.name).name).toEqual(table.name)
  })
})
