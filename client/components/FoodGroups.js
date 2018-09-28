import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import {foodGroupCategories} from '../utilities/foodGroupCat'
import {connect} from 'react-redux'
import {getFgCode} from '../store'


class DropDownFoodGroups extends Component {
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
    const selectedOption = this.state.options.filter(option => {
      return option.value === value
    })
    const selectedFG = selectedOption[0].code
    this.props.sendFGCode(selectedFG)


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
    icon='food'
    options={this.state.options}
    placeholder='Select Food Group'
    onChange={this.handleChange}
  />
  } 
}


const mapDispatchToProps = dispatch => {
  return {
    sendFGCode: (code) => dispatch(getFgCode(code))
  }
}

export default connect(null, mapDispatchToProps)(DropDownFoodGroups)