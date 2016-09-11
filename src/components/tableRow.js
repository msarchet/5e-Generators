import React from 'react'
import CSSModules from 'react-css-modules'
import { Row, Col } from 'elemental'

class TableRow extends React.Component {
  render () {
    let isSame = this.props.lowerBound === this.props.upperBound
    let range = isSame ? this.props.lowerBound : `${this.props.lowerBound} - ${this.props.upperBound}`

    return (
      <Row>
        <Col basis='10%'>{range}</Col>
        <Col basis='90%'>{this.props.result}</Col>
      </Row>
    )
  }
}

export default CSSModules(TableRow, {})
