import uuid from 'uuid'

import Table from './table'

class Storage
{
  constructor (key) {
    this.key = key
  }

  store (id, item) {
    window.localStorage.setItem(`${this.key}-${id}`, item)
  }

  get (id) {
    return window.localStorage.getItem(`${this.key}-${id}`)
  }

  list (mapper) {
    return Object.keys(window.localStorage).reduce((items, key) => {
      if (key.indexOf(this.key) === 0) {
        items.push(mapper(window.localStorage.getItem(key)))
      }

      return items
    }, [])
  }
}

export default class TableStorage extends Storage
{
  constructor () {
    super('Table')
  }

  get (id) {
    let loaded = super.get(id)
    return Table.fromJson(loaded)
  }

  store (table) {
    const id = table.id || uuid.v4()
    if (!table.id || table.id === '') {
      table.id = id
    }
    super.store(id, Table.toJson(table))
  }

  list () {
    return super.list(Table.fromJson)
  }
}
