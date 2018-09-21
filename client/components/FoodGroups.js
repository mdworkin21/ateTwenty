import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'
import {connect} from 'react-redux'
// import {getFgCode} from '../store'
import {foodGroupCategories} from '../utilities/foodGroupCat'
console.log(foodGroupCategories)


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
    const selectedOption = this.state.options.filter(option => {
      return option.value === value
    })
    const selectedFG = selectedOption[0].code
    console.log(selectedFG)
    // this.props.sendFGCode(selectedFG)
    this.setState({ 
      value: value })
  }

   componentDidMount(){
    try{
      // const allFoodGroups = await axios.get('/api/foodGroups')
      // console.log('FOODGROUPS',allFoodGroups.data)
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

// const mapDispatchToProps = dispatch => {
//   return {
//     sendFGCode: (code) => dispatch(getFgCode(code))
//   }
// }

// export default connect(null, mapDispatchToProps)(DropDownFoodGroups)