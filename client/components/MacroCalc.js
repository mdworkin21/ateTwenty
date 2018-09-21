import React, {Component} from 'react'
import { Form, Checkbox, Popup, Radio} from 'semantic-ui-react'
import {feetToCm, inchesToCm, totalHeight, poundsToKg, MifflinForMen,MifflinForWomen, TDEECalc, dailyCalIntake, dailyProtein, dailyCarb, dailyFat} from '../utilities/MacroEquations'
import NavBar from './NavBar'
import DailyGoals from './MacTotals'


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
    return this.state.alert ? <DailyGoals state={this.state}/> : (
      <React.Fragment>
      <div className="macFormContainer">
        <Form className='ui form form ui form'>
        <h1>Calculate Your Macros</h1>
          <Form.Group widths='equal' id="calcInputs">
            
            <Form.Input fluid required label='Age' type="number" min="0" name="age" value={this.state.age} onChange={this.handleChange} placeholder='Age'  />
            
            <Form.Select fluid required label='Gender' options={options} placeholder='Gender' name="gender" value={this.state.gender} onChange={this.handleChange}/>

            <Form.Input fluid required label='Height (ft)' type="number" min="0" placeholder='Feet' name="feet" value={this.state.feet} onChange={this.handleChange}/>
          
            <Form.Input fluid required label='Height (in)' type="number" min="0" placeholder='Inches' name="inches" value={this.state.inches} onChange={this.handleChange} />

            <Form.Input fluid required label='Weight (pds)' placeholder='Weight (pds)' type="number" min="0" name="weight" value={this.state.weight} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group inline required id='titles'>
          <label required>Activity Level</label>
          
          <Popup 
              className='change'
              trigger={<Form.Radio
              label='Sedentary'
              value='sedentary'
              name="activity"
              // checked={value === 'sedentary'}
              onChange={this.handleChange}
            />}
            content="I barely get out of bed. But I walk to get food, pee, and maybe walk the dog"
            basic 
          />

          <Popup 
            trigger={<Form.Radio
            label='Lightly Active'
            value='light'
            name="activity"
            // checked={value === 'light'}
            onClick={this.handleChange}
            />}
          content="Any activity that burns: 250-500 calories (male), 200-400 calories(female)"
          basic />

          <Popup 
            trigger={<Form.Radio
            label='Moderately Active'
            value='moderate'
            name="activity"
            // checked={value === this.state.activity}
            onChange={this.handleChange}
            />}
          content="Any activity that burns: 500-650 calories (male), 350-500 calories (female)"
          basic />

          <Popup 
            trigger={<Form.Radio
            label='Very Active'
            value='very'
            name="activity"
            // checked={this.state.activity.value === this.state.activity}
            onChange={this.handleChange}
            />}
            content="Any activity that burns: 650-800 calories (male), 500-650 calories (female)"
            basic />

          <Popup 
            trigger={<Radio
            label='Extremely Active'
            value='extremely'
            name="activity"
            // checked={value === this.state.activity}
            onChange={this.handleChange}
            />}
            content="Any activity that burns: 800+ calories (male), 650+ calories (female)"
            basic />
        </Form.Group>
        
        <Form.Group inline>
        <label>Fitness Goals</label>
        <Form.Radio
            label='Lose'
            value='lose'
            name='goals'
            // checked={value === 'lose'}
            onChange={this.handleChange}
            />

        <Form.Radio
            label='Maintain'
            value='maintain'
            name="goals"
            // checked={value === 'maintain'}
            onChange={this.handleChange}
            />

        <Form.Radio
            label='Gain'
            value='gain'
            name='goals'
            // checked={value === 'gain'}
            onChange={this.handleChange}
            />
        </Form.Group>
        <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
        </Form>

      <NavBar/>
      </div>
      </React.Fragment>
    )
  }

}



