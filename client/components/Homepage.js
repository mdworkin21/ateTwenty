import React, { Component } from 'react'
import MacroCalc from './MacroCalc'

class Homepage extends React.Component {
  render(){
    return (
      <React.Fragment>
        <h1 id='welcome'>Welcome to AteTwenty!</h1>
        <MacroCalc />
      </React.Fragment>
    )
  }
}

export default Homepage