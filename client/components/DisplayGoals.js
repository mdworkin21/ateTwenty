import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getUserFromPassport, retrieveDailyGoals} from '../store'
import regeneratorRuntime from "regenerator-runtime";


class DisplayGoals extends Component {
  async componentDidMount(){
    await this.props.setUser()
    await this.props.getGoals(this.props.user)
  }

  render(){
    console.log("POPOO{OP", this.props)
     return (
      <div id="goals">
       <Menu.Item name="Goals" id="title" className='item' >Goals</Menu.Item>
       <Menu.Item name="Cal" id="calGoal" className='item' > Cal: {this.props.dailyGoals.calGoal}</Menu.Item>
       <Menu.Item name="Protein" id="proteinGoal" className='item' > Protein: {this.props.dailyGoals.proteinGoal}</Menu.Item>
       <Menu.Item name="Carb" id="carbGoal" className='item'  > Carb:  {this.props.dailyGoals.carbGoal}</Menu.Item>
       <Menu.Item name="Fat" id="fatGoal" className='item' > Fat: {this.props.dailyGoals.fatGoal}</Menu.Item>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dailyGoals: state.dailyGoals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGoals: (id) => dispatch(retrieveDailyGoals(id)),
    setUser: () => dispatch(getUserFromPassport())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGoals)