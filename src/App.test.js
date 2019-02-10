import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configure , shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Provider from 'react-redux'
import store from './redux/store'

configure({adapter:new Adapter()})

describe('<App/>', ()=>{
  const wrapper = shallow(  <App store={store}/>)
 
  it('should render App', ()=>{
console.log(wrapper.debug())
  
  })
  it('should contain a Sheet element',()=>{
    expect(wrapper.dive('Sheet').length).toEqual(1)
  })
})