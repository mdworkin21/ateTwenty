import React, {Component} from 'react'
import { Form, Button, Grid, GridColumn, Header, Image, Segment, Message } from 'semantic-ui-react'
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {getUserFromPassport} from '../store'
import {connect} from 'react-redux'

//Similar to signin, not fan of style tags below, but for now it'll do
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
      
      if(newUser.status === 201){
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
    console.log('STATE', this.state)
    const { from, signup} = { from: { pathname: "/calc" }}
    if (this.state.redirect) {
      return <Redirect to={from} />
    } 
    return (
      <div className='login-form'>
      <style>{`
     body > div,
     body > div > div,
     body > div > div > div.login-form {
       height: 100%;
     }
   `}</style>
       <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
         <Grid.Column style={{ maxWidth: 450 }}>
           <Header as='h2' color='blue' textAlign='center'>
             Please Enter Your Information Below
           </Header>
           <Form size='large' >
             <Segment stacked>
             <Form.Input fluid icon='user' iconPosition='left' placeholder='name' name="name" onChange={this.handleChange} />
               <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' name="email" onChange={this.handleChange} />
               <Form.Input fluid icon='lock' iconPosition='left'  name='password' placeholder='Password' type='password' onChange={this.handleChange}/>
               <Button fluid color='blue' onClick={this.handleSubmit}  type="submit" size='large'>Submit</Button>
             </Segment>
           </Form>
         </Grid.Column>
       </Grid>
     </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(getUserFromPassport(user))
   
  }
}

export default connect(null, mapDispatchToProps)(SignUp)