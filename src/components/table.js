import React from 'react'
import CSSModules from 'react-css-modules'

import TableRow from './tableRow'

class Table extends React.Component {
  constructor (props) {
    super(props)

    let table = this.props.table

    this.state = { table }
  }

  render () {
    let tableData = this.state.table
    let rows = tableData.rows.map(row => <TableRow {...row} />)
    return (
      <div>
        <div>{tableData.name}</div>
        <table>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}

export default CSSModules(Table, {})
