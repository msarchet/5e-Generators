import React from 'react'
import CSSModules from 'react-css-modules'
import uuid from 'uuid'

import { Form, FormField, FormInput, Button } from 'elemental'

import TableRow from './tableRow'

class Table extends React.Component {
  constructor (props) {
    super(props)

    let tableData = this.props.table

    this.state = { tableData, numberOfRolls: 1, result: [] }
  }

  roll () {
    let result = this.state.tableData.roll(this.state.numberOfRolls)
    this.setState({result})
  }

  renderRows (rows = []) {
    return rows.map(row => {
      let asObject = Object.assign({}, row)
      let key = uuid.v4()

      return (<TableRow key={key} {...asObject} />)
    })
  }

  inputChanged (e) {
    let value = e.target.value
    this.setState({numberOfRolls: +value})
  }

  render () {
    let { tableData, result, numberOfRolls } = this.state
    let rows = this.renderRows(tableData.rows)
    let results = this.renderRows(result)

    return (
      <div>
        <h1>{tableData.name}</h1>
        <div>
          { rows }
        </div>
        <Form>
          <FormField label='Roll This Table' htmlFor='number-of-rolls'>
            <FormInput type='number' onChange={this.inputChanged.bind(this)} value={numberOfRolls} name='number-of-rolls' />
          </FormField>
          <Button onClick={this.roll.bind(this)} >Roll</Button>
        </Form>
        <div>
          {results}
        </div>
      </div>
    )
  }
}

export default CSSModules(Table, {})
