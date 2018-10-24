import React, {Component} from 'react'
import { Form, Segment, Grid, Header} from 'semantic-ui-react'
import {feetToCm, inchesToCm, totalHeight, poundsToKg, MifflinForMen,MifflinForWomen, TDEECalc, dailyCalIntake, dailyProtein, dailyCarb, dailyFat} from '../utilities/MacroEquations'
import NavBar from './NavBar'
import DailyGoals from './MacTotals'


const gender = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const activityLevel= [
  {key: 's', text: 'Sedentary: What\'s walking?', value: 'sedentary'},
  {key: 'la', text: 'Lightly Active: You burn 250-500 cal (male), 200-400 cal(female) ', value: 'light'},
  {key: 'ma', text: 'Moderately Active: You burn 500-650 cal (male), 350-500 cal (female)', value: 'moderate'},
  {key: 'va', text: 'Very Active: You burn 650-800 cal (male), 500-650 cal (female)', value: 'very'},
  {key: 'ea', text: 'Extremely Active: You burn 800+ cal (male), 650+ cal (female)', value: 'extremely'}
]

const fitnessGoals = [
  {key: 'l', text: 'Lose', value: 'lose'},
  {key: 'm', text: 'Maintain', value: 'maintain'},
  {key: 'lg', text: 'Gain', value: 'gain'}
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
      goals: '',
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
    console.log(this.state)
    return this.state.alert ? <DailyGoals state={this.state}/> : (
      <React.Fragment>
      <div className="macFormContainer">
        <Grid  textAlign='center' style={{ height: '100%' }} >
        <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        <Form className='ui form form ui form' size='large'>
        <Header>Calculate Your Macros</Header>

          <Segment widths='equal' id="calcInputs">
            <Header textAlign='center'>Your Stats</Header>
            <Form.Input fluid required label='Age' type="number" min="0" name="age" value={this.state.age} onChange={this.handleChange} placeholder='Age'/>
            <Form.Select fluid required label='Gender' options={gender} placeholder='Gender' name="gender" value={this.state.gender} onChange={this.handleChange}/>
            <Form.Input fluid required label='Height (ft)' type="number" min="0" placeholder='Feet' name="feet" value={this.state.feet} onChange={this.handleChange}/>
            <Form.Input fluid required label='Height (in)' type="number" min="0" placeholder='Inches' name="inches" value={this.state.inches} onChange={this.handleChange} />
            <Form.Input fluid required label='Weight (pds)' placeholder='Weight (pds)' type="number" min="0" name="weight" value={this.state.weight} onChange={this.handleChange} />
          </Segment>

          <Segment inline='true' required id='titles'> 
            <Header textAlign='center'>Activity Level</Header>  
            <Form.Select fluid required options={activityLevel} placeholder='Activity Level' name="activity" value={this.state.activity} onChange={this.handleChange}/>
          </Segment>

          <Segment inline='true'>
            <Header textAlign='center'>Fitness Goals</Header>
            <Form.Select fluid required  options={fitnessGoals} placeholder='Goals' name="goals" value={this.state.goals} onChange={this.handleChange}/>
          </Segment>

          <Form.Button color='blue' onClick={this.handleSubmit}>Submit</Form.Button>
        </Form>
        </Segment>
        </Grid.Column>
        </Grid>
      </div>
      {/* <NavBar/> */}
      </React.Fragment>
    )
  }

}

//Uncomment Navbar and fix placement when styiling

