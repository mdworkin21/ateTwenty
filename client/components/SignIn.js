import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import {Redirect} from 'react-router-dom'

class SignIn extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkUser = this.checkUser.bind(this)
  }

  async checkUser(event){
    event.preventDefault()
    try{
      const doesUserExist = await axios.put('/api/user/checkUser', {
        name: this.state.name, 
        email: this.state.email
      })

      if(doesUserExist.status === '200'){
        this.setState({
          name: '',
          email: '',
          redirect: true
        })
      } else {
        console.log(err)
      }
    }catch(err){
      console.log(err)
    }
  }

  async handleSubmit(event){
    event.preventDefault()
    try{
      const newUser = await axios.post('/api/user/newUser', {
        name: this.state.name, 
        email: this.state.email
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

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const { from } = { from: { pathname: "/home" } } 

    if (this.state.redirect) {
      return <Redirect to={from} />
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
          <Button onClick={this.handleSubmit} icon='signup' type="submit" />
          <Button onClick={this.checkUser} icon='home' type="submit" />
        </Form>

      </React.Fragment>
    )
  }
}

export default SignIn