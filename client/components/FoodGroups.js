import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import {foodGroupCategories} from '../utilities/foodGroupCat'

export default class DropDownFoodGroups extends Component {
  constructor(){
    super()
    this.state = {
      options: [],
      value: ''
    }
  }

  addTextPropertyDeleteCreatedUpdated(arr){
    let arrWithTextProp = []
    arr.forEach(object => {
      object.text = object.category
      object.key = object.id
      object.value = object.id
      delete object.createdAt
      delete object.updatedAt
      arrWithTextProp.push(object)
    })
    return arrWithTextProp
  }

  handleChange = (e, {value}) => {
    this.setState({ 
      value: value })
  }

   componentDidMount(){
    try{
      const alteredData = this.addTextPropertyDeleteCreatedUpdated(foodGroupCategories)
      this.setState({
        options: alteredData
      })
    } catch(err){
        console.log(err)
    }
  }
  
  render(){
    return <Dropdown
    button
    className='icon'
    floating
    labeled
    icon='world'
    options={this.state.options}
    search
    text='Select Food Group'
    onChange={this.handleChange}
  />
  } 
}
