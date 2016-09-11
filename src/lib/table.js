import { takeRight } from 'lodash'
import Dice from './dice'

export default class Table
{
  constructor (name) {
    this.rows = []
    this.index = {}
    this.name = name
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
}
