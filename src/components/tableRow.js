import React from 'react'
import CSSModules from 'react-css-modules'

class TableRow extends React.Component {
  render () {
    return (
      <tr>
        <td>{this.props.lowerBound} - {this.props.upperBound}</td>
        <td>{this.props.result}</td>
      </tr>
    )
  }
}

export default CSSModules(TableRow, {})
