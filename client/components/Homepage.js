import React, {Component} from 'react'
import NavBar from './NavBar'
import { connect } from 'react-redux';
import DisplayGoals from './DisplayGoals'
import Log from './Log'
import TopNav from './TopNav'
import CurrentTotal from './CurrentTotals'
import {getUserFromPassport, getFoodTotals} from '../store'
import regeneratorRuntime from "regenerator-runtime";


class Homepage extends React.Component {
  constructor(){
    super()
    this.state = {
      redirect: false
    }
  
  }

  async componentDidMount(){
    await this.props.setUser(this.props.state.user)
    await this.props.displayTotals(this.props.state.user)


  }

  render(){
    let date = new Date().toString()
    date = date.slice(0, date.indexOf(':') - 3)
   
    return(
      <React.Fragment>
        <TopNav />
        <h1 id='welcome'>Welcome to AteTwenty!</h1>
        <DisplayGoals />
        <h2>CURRENT TOTALS</h2>
        <CurrentTotal />
        <h1>{`${date}`}</h1>
        <Log />
        <NavBar />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(getUserFromPassport(user)),
    displayTotals: (id) => dispatch(getFoodTotals(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)