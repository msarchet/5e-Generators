/* @flow */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/app.css'

import TableModel from '../lib/table'
import TableStorage from '../lib/loadTable'

import Table from './table'
import SimpleForm from './form'

const tableStorage = new TableStorage()

const selectTableOptions = tables => {
  return {
    fields: [
      {
        name: 'table',
        type: 'select',
        values: tables.map(table => {
          return {
            label: table.name,
            value: TableModel.toJson(table),
            disabled: false
          }
        })
      }
    ],
    label: 'Select a Table',
    direction: SimpleForm.Directions.Horizontal,
    submitText: 'Select'
  }
}
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tables: tableStorage.list() || [], table: null }
  }

  setTable (formData) {
    let table = TableModel.fromJson(formData.table)
    this.setState({table})
  }

  render () {
    let { table } = this.state
    let options = selectTableOptions(this.state.tables)
    let children = [
      (<h1 styleName='header'>Generators</h1>),
      (<SimpleForm onSubmit={this.setTable.bind(this)} {...options} />)
    ]

    if (table) {
      children.push((<Table key={table.id} table={table} />))
    }

    return (
      <article>
        { children }
      </article>
    )
  }
}

export default CSSModules(App, styles)
