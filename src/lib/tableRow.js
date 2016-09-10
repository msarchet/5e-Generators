/* @flow */

export default class TableRow {
  lowerBound
  upperBound
  result

  constructor (lowerBound, upperBound, result) {
    if (lowerBound > upperBound) {
      throw new Error(`Lower bound ${lowerBound} must be less than upper bound ${upperBound}`)
    }
    this.lowerBound = lowerBound
    this.upperBound = upperBound
    this.result = result
  }

  isValid (value) {
    return value >= this.lowerBound && value <= this.upperBound
  }
}

