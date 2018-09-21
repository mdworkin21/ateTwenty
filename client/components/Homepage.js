import React, {Component} from 'react'
import NavBar from './NavBar'
import { connect } from 'react-redux';
import {getFoodFromLog, getFoodTotals} from '../store'
import {Grid, Segment, Image, Divider} from 'semantic-ui-react'
import DisplayGoals from './DisplayGoals'

class Homepage extends React.Component {
  render(){
    return (
      <React.Fragment>
        <h1 id='welcome'>Welcome to AteTwenty!</h1>
        <DisplayGoals/>
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
    displayTotals: () => dispatch(getFoodTotals())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)