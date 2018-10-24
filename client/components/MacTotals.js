import React, {Component} from 'react'
import { Card, Icon, Button, Modal, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setDailyGoal} from '../store'
import Homepage from './Homepage'
import MacroCalc from './MacroCalc'
import regeneratorRuntime from "regenerator-runtime";

class DailyGoals extends Component{
  constructor(){
    super()
    this.state = {
      redirect: false,
      retry: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.tryAgain = this.tryAgain.bind(this)
  }

  async handleSubmit(event){
    event.preventDefault()
    this.props.setGoals({
      calories: this.props.state.totals.calGoal,
      protein: this.props.state.totals.proteinGoal,
      carb: this.props.state.totals.carbGoal,
      fat: this.props.state.totals.fatGoal,
      userId: this.props.user
    })
    
    this.setState({
      redirect: true
    })
  }

  tryAgain(event){
    event.preventDefault()
    this.setState({
      retry: true
    })
  }

  render(){
   if (this.state.redirect){
     return <Homepage />
   } else if (this.state.retry){
     return <MacroCalc />
   } else {
     return (
      <div className="addCard">
      <Modal open={this.props.state.alert} style={{maxWidth: 450, textAlign:'center'}}>
        {/* <Card> */}
          <Modal.Content>
          <Modal.Header>
            <h1>Your Daily Goals</h1>
          </Modal.Header>
          <Divider section />
          <Modal.Content content={<h3>Calories: {this.props.state.totals.calGoal} </h3> }/>
          <Divider section />
          <Modal.Content content={<h3>Protein: {this.props.state.totals.proteinGoal} grams </h3>}/> 
          <Divider section />
          <Modal.Content content={<h3>Carb: {this.props.state.totals.carbGoal} grams</h3>}/>
          <Divider section />
          <Modal.Content content={<h3>Fat: {this.props.state.totals.fatGoal} grams</h3>} />
          </Modal.Content>
          <Divider section />

          <Modal.Content extra='true'>
            {/* <Icon name='plus' />
            Click to set daily goals */}
            <div id="buttonContainer">
              <Button fluid  color='blue' onClick={this.handleSubmit} size='large'> Set as Daily Goal?</Button>
              <Button fluid  id="bossyPants2" onClick={this.tryAgain} size='large'> Nah, Let Me Try Again </Button>
            </div>
          </Modal.Content>
        {/* </Card> */}
        </Modal>
      </div>
    )
   } 
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGoals: (goals) => dispatch(setDailyGoal(goals))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyGoals)