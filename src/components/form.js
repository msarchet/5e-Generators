import React from 'react'

import { Button, Card, Form, FormField, FormInput, FormSelect } from 'elemental'

export default class SimpleForm extends React.Component
{
  constructor (props) {
    super(props)
    let newstate = {}

    this.props.fields.reduce((state, field) => {
      state[field.name] = {}
      return state
    }, newstate)

    this.state = newstate
  }

  onSubmit () {
    this.props.onSubmit(this.state)
  }

  updateState (name, value) {
    let copiedState = Object.assign({}, this.state)
    copiedState[name] = value
    this.setState(copiedState)
  }

  handleSelect (name, value) {
    this.updateState(name, value)
  }

  handleInput (name, inputEvent) {
    let value = inputEvent.target.value
    this.updateState(name, value)
  }

  renderField (field) {
    let key = `form-field-${field.name}`
    if (field.type === 'select') {
      return (
        <FormField key={key} label={field.label} htmlFor={key}>
          <FormSelect type={field.type} onChange={(e) => this.handleSelect(field.name, e)} options={field.values} />
        </FormField>
      )
    }
    return (
      <FormField key={key} label={field.label} htmlFor={key}>
        <FormInput type={field.type} onChange={(e) => this.handleInput(field.name, e)} placeholder={field.placeholder} />
      </FormField>
    )
  }

  renderFields () {
    return this.props.fields.map(this.renderField.bind(this))
  }

  render () {
    return (
      <Card>
        <p>{this.props.label || 'Form'}</p>
        <Form type={this.props.direction}>
          { this.renderFields() }
          <FormField>
            <Button type='primary' onClick={this.onSubmit.bind(this)}>{this.props.submitText || 'Submit'}</Button>
          </FormField>
        </Form>
      </Card>
    )
  }

  static get Directions () {
    return {
      Horizontal: 'horizontal',
      Inline: 'inline',
      Vertical: 'vertical'
    }
  }
}
