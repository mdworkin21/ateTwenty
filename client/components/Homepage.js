import React, {Component} from 'react'
import NavBar from './NavBar'
import { connect } from 'react-redux';
import {getFoodFromLog, getFoodTotals} from '../store'
import {Grid, Segment, Image, Divider} from 'semantic-ui-react'
import DisplayGoals from './DisplayGoals'
import Log from './Log'
import TopNav from './TopNav'

//Need to abstract out search bar (et al.), then when search is activated, switch to search page
class Homepage extends React.Component {
  constructor(){
    super()
  }


  render(){
    let date = new Date().toString()
    date = date.slice(0, date.indexOf(':') - 3)
    
    return (
      <React.Fragment>
        <TopNav />
        <h1 id='welcome'>Welcome to AteTwenty!</h1>
        <DisplayGoals/>
        <h2>CURRENT TOTALS</h2>
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
    displayTotals: () => dispatch(getFoodTotals())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)