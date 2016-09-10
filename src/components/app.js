/* @flow */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/app.css'
import Table from '../lib/table'
import TableRow from '../lib/tableRow'

class App extends React.Component {
  constructor (props) {
    super(props)
    let table = new Table()
    table.addRow(new TableRow(1, 1, 'You die'))
    table.addRow(new TableRow(2, 2, 'You live'))
    table.addRow(new TableRow(3, 3, 'You Suffer a small Injury'))
    table.addRow(new TableRow(4, 4, 'Ouch'))
    this.state = { table }
  }

  click () {
    let table = this.state.table
    let roll = table.roll()
    console.log(roll)
    this.setState({result: roll})
  }

  render () {
    console.log(this.state)

    let rows = this.state.table.rows.map(row => {
      return (<li>{row.lowerBound} - {row.upperBound} | {row.result}</li>)
    })

    let rollResult = this.state.result != null ? this.state.result.result : 'Roll The Table!'

    return (
      <article>
        <h1 styleName='header'>Generators</h1>
        <ul>
          { rows }
        </ul>
        <button onClick={this.click.bind(this)}>Roll</button>
        {rollResult}
      </article>
    )
  }
}

export default CSSModules(App, styles)
