import React from 'react'
import CSSModules from 'react-css-modules'
import uuid from 'uuid'

import { Button, Row, Col } from 'elemental'

import SimpleForm from './form'
import TableRow from './tableRow'
import TableRowModel from '../lib/tableRow'
import TableStorage from '../lib/loadTable'

const storage = new TableStorage()

const newRowFormOptions = {
  fields: [
    { name: 'lowerBound', placeholder: 0, type: 'number', label: 'Lower Bound' },
    { name: 'upperBound', placeholder: 0, type: 'number', label: 'Upper Bound' },
    { name: 'result', placeholder: 0, type: 'string', label: 'Result' },
    {
      name: 'type',
      placeholder: 0,
      type: 'select',
      label: 'Type',
      values: TableRowModel.Types.map(type => {
        return {
          label: type,
          value: type,
          disabled: false
        }
      })
    }
  ],
  label: 'Add Row',
  direction: SimpleForm.Directions.Horizontal,
  submitText: 'Add'
}

const handleRollFormOptions = {
  fields: [
    { name: 'roll', placeholder: 1, type: 'number', label: 'Times to Roll' }
  ],
  label: 'Roll Table',
  direction: SimpleForm.Directions.Horizontal,
  submitText: 'Roll'
}

class Table extends React.Component {
  constructor (props) {
    super(props)

    let tableData = this.props.table
    this.state = { tableData, result: [] }
  }

  addRow (row) {
    let tableData = this.state.tableData
    tableData.addRow(row)
  }

  renderRows (rows = []) {
    return rows.map(row => {
      let asObject = Object.assign({}, row)
      let key = uuid.v4()

      return (<TableRow key={key} {...asObject} />)
    })
  }

  handleNewRow (row) {
    let { tableData } = this.state
    tableData.addRow(new TableRowModel(row.lowerBound, row.upperBound, row.result, row.type))
    this.setState({tableData})
  }

  handleRollTable (formData) {
    let { roll } = formData
    let result = this.state.tableData.roll(+roll)
    this.setState({result})
  }

  render () {
    let { tableData, result } = this.state
    let rows = this.renderRows(tableData.rows)
    let results = this.renderRows(result)

    return (
      <div>
        <Row>
          <Col bias='90%'>
            <h1>{tableData.name}</h1>
          </Col>
          <Col bias='10%'>
            <Button type='primary' onClick={() => storage.store(tableData)}>Save</Button>
          </Col>
        </Row>
        { rows }
        <SimpleForm onSubmit={this.handleNewRow.bind(this)} {...newRowFormOptions} />
        <SimpleForm onSubmit={this.handleRollTable.bind(this)} {...handleRollFormOptions} />
        <div>
          {results}
        </div>
      </div>
    )
  }
}

export default CSSModules(Table, {})
