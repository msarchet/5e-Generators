import Table from './table'

class Storage
{
  constructor (key) {
    this.key = key
  }

  store (id, item) {
    console.log('calling store', id, item)
    window.localStorage.setItem(`${this.key}-${id}`, item)
  }

  get (id) {
    return window.localStorage.getItem(`${this.key}-${id}`)
  }
}
export default class TableStorage extends Storage
{
  constructor () {
    super('Table')
  }

  get (id) {
    let loaded = super.get(id)
    console.log(loaded)
    if (loaded === null) {
      let parsed = JSON.parse(loaded)
      let table = new Table(parsed.name)
      parsed.rows.forEach(table.addRow.bind(table))
      return table
    }

    return null
  }
}
