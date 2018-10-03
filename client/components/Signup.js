import React, {Component} from 'react'
import { Form, Button} from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {getUserFromPassport} from '../store'
import {connect} from 'react-redux'


class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '', 
      password: '',
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
      const newUser = await axios.post('/authenticate/newUser', {
        name: this.state.name, 
        email: this.state.email,
        password: this.state.password
      })
      console.log(newUser.status)
      console.log('NEWWWWW', newUser)
      
      if(newUser.status === 201){
        console.log("POOOOOP")
        this.props.setUser(newUser.data.id)
      }
      this.setState({
        name: '',
        email: '',
        password: '',
        redirect: true
      })
    } catch(err){
      console.log(err)
    }
  }

  render(){
    const { from, signup} = { from: { pathname: "/calc" }}
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
            <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <input type='text' name='password' value={this.state.password} onChange={this.handleChange} />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Click</Button>
        </Form>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(getUserFromPassport(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUp)