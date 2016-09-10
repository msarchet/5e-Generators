export default class TableRow {
  constructor (lowerBound, upperBound, result, type = 'result') {
    if (lowerBound > upperBound) {
      throw new Error(`Lower bound ${lowerBound} must be less than upper bound ${upperBound}`)
    }

    this.lowerBound = lowerBound
    this.upperBound = upperBound
    this.result = result
    this.type = type
  }

  isValid (value) {
    return value >= this.lowerBound && value <= this.upperBound
  }
}

