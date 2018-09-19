import React, {Component} from 'react'
import { Form, Checkbox, Popup, Radio} from 'semantic-ui-react'
import {feetToCm, inchesToCm, totalHeight, poundsToKg, MifflinForMen,MifflinForWomen, TDEECalc, dailyCalIntake, dailyProtein, dailyCarb, dailyFat} from '../utilities/MacroEquations'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

export default class MacroCalc extends Component {
  constructor(){
    super()
    this.state = {
      age: '',
      gender: '',
      feet: '',
      inches: '',
      weight: '',
      activity: '',
      goals: false,
      totals: {},
      alert: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value})

  handleSubmit(event){
    event.preventDefault()
    this.setState({
      totals: this.macCalculations(),
      alert: true
    })
  }

  macCalculations(){
    const height = feetToCm(this.state.feet) + inchesToCm(this.state.inches)
    const weight = poundsToKg(this.state.weight)

    let REE;
    if (this.state.gender === 'male'){
      REE = MifflinForMen(this.state.age, height, weight)
    } else {
      REE = MifflinForWomen(this.state.age, height, weight)
    }

    const TDEE = TDEECalc(REE, this.state.activity)
    const calGoal = Math.round(dailyCalIntake(TDEE, this.state.goals))
    const proteinGoal = Math.round(dailyProtein(calGoal))
    const carbGoal = Math.round(dailyCarb(calGoal))
    const fatGoal = Math.round(dailyFat(calGoal))

    return {
      calGoal,
      proteinGoal,
      carbGoal,
      fatGoal
    }
  }

  render(){
    return (
      <div id='moveDown'>
      <div id="macFormContainer">
        <h1>FROM CALC</h1>
        <Form id="macForm">
            <Form.Group widths='equal'>
            
            <Form.Input fluid required label='Age' type="number" min="0" name="age" value={this.state.age} onChange={this.handleChange} placeholder='Age'  />
            
            <Form.Select fluid required label='Gender' options={options} placeholder='Gender' name="gender" value={this.state.gender} onChange={this.handleChange}/>

            <Form.Input fluid required label='Height (ft)' type="number" min="0" placeholder='Feet' name="feet" value={this.state.feet} onChange={this.handleChange}/>
          
            <Form.Input fluid required label='Height (in)' type="number" min="0" placeholder='Inches' name="inches" value={this.state.inches} onChange={this.handleChange} />

            <Form.Input fluid required label='Weight (pds)' placeholder='Weight (pds)' type="number" min="0" name="weight" value={this.state.weight} onChange={this.handleChange} />
          </Form.Group>
        </Form>
      </div>
      </div>
      
    )
  }

}



