import React, {Component} from 'react'
import { Form, Button, ButtonGroup } from 'semantic-ui-react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import {Redirect} from 'react-router-dom'
import {getUserFromPassport} from '../store'
import {connect} from 'react-redux'


class SignIn extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
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
      const doesUserExist = await axios.post('/authenticate/checkUser', { 
        email: this.state.email,
        password: this.state.password
      })

      if(doesUserExist.status === 200){
        this.props.setUser(doesUserExist.data.id)

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
          <input type="text" name="email" placeholder='email' onChange={this.handleChange} value={this.state.email}/>
          </Form.Field>
          <Form.Field>
          <input type="text" name="password" placeholder='password' onChange={this.handleChange} value={this.state.password}/>
          </Form.Field>
          <Button onClick={this.checkUser}  type="submit" >Log In </Button>
          <Button onClick={this.signup} type="submit">Sign Up</Button>
        </Form>

      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(getUserFromPassport(user)),
  }
}

export default connect(null, mapDispatchToProps)(SignIn)