import React, { Component } from 'react'
import NavBar from './NavBar'
import { Divider} from 'semantic-ui-react'

class Homepage extends React.Component {
  render(){
    return (
      <React.Fragment>
        <h1 id='welcome'>Welcome to AteTwenty!</h1>
        <NavBar />
      </React.Fragment>
    )
  }
}

export default Homepage