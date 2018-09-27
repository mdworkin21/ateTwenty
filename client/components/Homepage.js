import React, {Component} from 'react'
import NavBar from './NavBar'
import { connect } from 'react-redux';
import {getFoodFromLog, getFoodTotals} from '../store'
import {Grid, Segment, Image, Divider} from 'semantic-ui-react'
import DisplayGoals from './DisplayGoals'
import SearchPage from './SearchPage'
import Log from './Log'
import TopNav from './TopNav'

//Need to abstract out search bar (et al.), then when search is activated, switch to search page
class Homepage extends React.Component {
  constructor(){
    super()
  }
  render(){
    return (
      <React.Fragment>
        <TopNav />
        <h1 id='welcome'>Welcome to AteTwenty!</h1>
        <DisplayGoals/>
        <h2>CURRENT TOTALS</h2>
        {/* <SearchPage /> */}
        <h1>TODAY'S Date</h1>
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