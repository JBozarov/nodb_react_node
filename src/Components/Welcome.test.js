import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Welcome from './Welcome'
import App from '../App'

Enzyme.configure({ adapter: new Adapter() })

describe('Welcome component', () => {
   it('To have text: Let\'s find out where you', () => {
      const wrapper = shallow(<Welcome />)
      const firstLine = wrapper.find('#first-line')
      expect(firstLine.text()).toBe('Let\'s find out where you')
   }); 
   // it('test button', () => {
   //    // const mockCallBack = jest.fn();
   //    const wrapper = shallow(<Welcome />)
   //    const wrapperapp = shallow(<App />)
   //    // const button = shallow(<Welcome onClick = {mockCallBack} />)
   //    const button = wrapper.find('button')
   //    // wrapper.
   //    expect(button.text()).toBe('Discover')
   //    expect(wrapperapp.state().toggleAll).toBeFalsy()
   //    button.simulate('click')
   //    expect(wrapperapp.state().toggleAll).toBeTruthy()
   // })
   it('test button', () => {
      const wrapper = shallow(<App />)
      const instance = wrapper.instance(); 
      expect(wrapper.state().toggleAll).toBeFalsy(); 
      instance.discover(); 
      expect(wrapper.state().toggleAll).toBeTruthy(); 
   })
})