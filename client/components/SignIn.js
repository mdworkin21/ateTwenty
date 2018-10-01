import React, {Component} from 'react'
import { Form, Button, ButtonGroup } from 'semantic-ui-react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import {Redirect} from 'react-router-dom'

class SignIn extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      redirectHome: false,
      signup: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.checkUser = this.checkUser.bind(this)
    this.signup = this.signup.bind(this)
  }

  signup(event){
    event.preventDefault()
    this.setState({
      signup: true
    })
  }

  async checkUser(event){
    event.preventDefault()
    try{
      const doesUserExist = await axios.put('/api/user/checkUser', {
        name: this.state.name, 
        email: this.state.email
      })
      if(doesUserExist.status === 200){
        this.setState({
          name: '',
          email: '',
          redirectHome: true
        })
      } else {
        console.log(err)
      }
    } catch(err){
      console.log(err)
    }
  } 
  
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const { from, signup} = { from: { pathname: "/home" }, signup: {pathname: "/signup"} } 

    if (this.state.redirectHome) {
      return <Redirect to={from} />
    } else if (this.state.signup) {
      return <Redirect to={signup} />
    } 
    
    return(
      <React.Fragment>
        <Form>
          <Form.Field>
          <input type="text" name="name"  onChange={this.handleChange} value={this.state.name}/>
          </Form.Field>
          <Form.Field>
          <input type="text" name="email"  onChange={this.handleChange} value={this.state.email}/>
          </Form.Field>
          <Button onClick={this.checkUser}  type="submit" >Log In </Button>
          <Button onClick={this.signup} type="submit">Sign Up</Button>
        </Form>

      </React.Fragment>
    )
  }
}

export default SignIn