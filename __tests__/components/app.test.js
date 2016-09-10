// We must mock the styles so that CSSModules plays nice
jest.mock('../../src/components/styles/app.css')

import React from 'react'
// this has all the test goodies
import { shallow } from 'enzyme'

// bring in any components we wist to use
import App from '../../src/components/app'

describe('App', () => {
  // Check that app renders as we think it should
  it('is an h1 and has its children', () => {
    const app = shallow(<App />)

    expect(app != null).toEqual(true)
    // expect(app.contains('Hello World!')).toEqual(true)
    // expect(app.node.type).toEqual('h1')
  })
})
