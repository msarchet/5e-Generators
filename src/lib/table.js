export default class Table
{
  constructor () {
    this.rows = []
    this.index = {}
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

  roll () {
    // determine a random number for the number of items on the table
    let last = this.index[this.index.length - 1]
    let value = +Math.random(last)
    let row = this.rows[value]

    return row
  }
}
