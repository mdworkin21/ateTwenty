import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import {connect} from 'react-redux'
import {getMeasurement} from '../store'
import {measurementType} from '../utilities/measurementConv'


// let measurementType = [{id: 1, key: 'oz', value: 'oz', text: 'oz', category: 'oz'}, {id: 2, key: 'cup', value: 'cup', text: 'cup', category: 'cup'}]

// export const measurementType = [
//   {id: 1, key: 'oz', value: 'oz', text: 'oz', category: 'oz'}, 
//   {id: 2, key: 'cup', value: 'cup', text: 'cup', category: 'cup'},
//   {id: 3, key: 'gram', value: 'gram', text: 'gram', category: 'gram'},
//   {id: 4, key: 'pd', value: 'pd', text: 'pd', category: 'pd'}

// ]

class MeasurementTypes extends Component {
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
    const selectedMeasure = selectedOption[0].category
    this.props.sendMeasurement(selectedMeasure)

    this.setState({ 
      value: value })
  }

   componentDidMount(){
    try{
      const alteredData = this.addTextPropertyDeleteCreatedUpdated(measurementType)
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
      icon="balance scale"
      options={this.state.options}
      placeholder='Measurement' 
      onChange={this.handleChange}
    />
    
  } 
}


const mapDispatchToProps = dispatch => {
  return {
    sendMeasurement: (measure) => dispatch(getMeasurement(measure))
  }
}

export default connect(null, mapDispatchToProps)(MeasurementTypes)
