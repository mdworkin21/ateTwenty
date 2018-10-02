import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Menu, Icon, Button} from 'semantic-ui-react'
import axios from 'axios'


export default class TopNav extends Component {
  constructor(){
    super()
    this.state = {
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    const logOut = axios.delete('/authenticate/logout')
    console.log('click')
    if (logOut){
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    const { from } = { from: { pathname: "/" } };    
    if (this.state.redirect) {
      return <Redirect to={from} />;
    }
    return (
      <Menu icon className="div ui menu top">
        <Menu.Item name='plus'> 
          <Link to="/search"> <Icon name='plus'/></Link>
        </Menu.Item>
        <Button onClick={this.handleSubmit}>Log out</Button>
      </Menu>
    )
  }
}

// export default TopNav