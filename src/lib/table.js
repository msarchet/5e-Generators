import { takeRight } from 'lodash'
import Dice from './dice'
import TableRow from './tableRow'

export default class Table
{
  constructor (name) {
    this.rows = []
    this.index = {}
    this.tags = []
    this.name = name
    this.id = ''
  }

  addRow (row) {
    this.rows.push(row)
    for (let i = row.lowerBound; i <= row.upperBound; i++) {
      if (this.index[i] != null) {
        throw new Error('Trying to add an existing row')
      }

      this.index[i] = row
    }
  }

  removeRow (index) {
    this.rows.splice(index, 1)
  }

  addTag (tag) {
    this.tags.push(tag)
  }

  removeTag (tag) {
    this.tags.splice(this.tags.indexOf(tag), 1)
  }

  roll (rolls = 1) {
    // determine a random number for the number of items on the table
    let last = takeRight(Object.keys(this.index), 1)

    let values = Dice.createDice(rolls, last).rolledDice
    let rows = []

    for (var i = 0; i < rolls; i++) {
      rows.push(this.rows[values[i].value - 1])
    }

    return rows
  }

  static fromJson (json) {
    let parsed = JSON.parse(json)
    let table = new Table(parsed.name)
    table.id = parsed.id
    parsed.rows.forEach(row => {
      const newRow = new TableRow(row.lowerBound, row.upperBound, row.result, row.type)
      table.addRow(newRow)
    })

    if (parsed.tags) {
      parsed.tags.forEach(tag => { table.addTag(tag) })
    }

    return table
  }

  static toJson (table) {
    return JSON.stringify({
      name: table.name,
      id: table.id,
      rows: table.rows,
      tags: table.tags
    })
  }
}
