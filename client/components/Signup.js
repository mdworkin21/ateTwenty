import React, {Component} from 'react'
import { Form, Button} from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'
import {Redirect} from 'react-router-dom'


export default class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '', 
      redirct: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event){
    event.preventDefault()
    try{
      const newUser = await axios.post('/api/user/newUser', {
        name: this.state.name, 
        email: this.state.email,

      })
      console.log(newUser.status)
      this.setState({
        name: '',
        email: '',
        redirect: true
      })
    } catch(err){
      console.log(err)
    }
  }

  render(){
    const { from, signup} = { from: { pathname: "/home" }}
    if (this.state.redirect) {
      return <Redirect to={from} />
    } 

    return (
      <React.Fragment>
        <h1>Sign Up</h1>
        <Form>
          <Form.Field>
            <input type='text' name='name' value={this.state.name} label='name' onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <input type='text' name='email' value={this.state.email}onChange={this.handleChange} />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Click</Button>
        </Form>
      </React.Fragment>
    )
  }
}