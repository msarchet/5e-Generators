/* @flow */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/app.css'

import TableModel from '../lib/table'
import TableRowModel from '../lib/tableRow'

import Table from './table'

class App extends React.Component {
  constructor (props) {
    super(props)
    let table = new TableModel()
    table.name = 'Test'
    table.addRow(new TableRowModel(1, 1, 'You die'))
    table.addRow(new TableRowModel(2, 2, 'You live'))
    table.addRow(new TableRowModel(3, 3, 'You Suffer a small Injury'))
    table.addRow(new TableRowModel(4, 4, 'Ouch'))
    this.state = { table }
  }

  render () {
    return (
      <article>
        <h1 styleName='header'>Generators</h1>
        <Table table={this.state.table} />
      </article>
    )
  }
}

export default CSSModules(App, styles)
