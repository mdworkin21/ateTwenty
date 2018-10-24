import React, {Component} from 'react'
import { Form, Button, Grid, GridColumn, Header, Image, Segment, Message } from 'semantic-ui-react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import {Link, Redirect} from 'react-router-dom'
import {getUserFromPassport} from '../store'
import {connect} from 'react-redux'
import ImgResults from './ImgResults';
import Homepage from './Homepage'
//Note: Not a fan of having the style tags in the render below, but it'll have to do for now.

class SignIn extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectHome: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.checkUser = this.checkUser.bind(this)
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

  componentDidMount(){
    this.setState({
      modal: true
    })
  }

  render(){
    const { from} = { from: { pathname: "/home" } } 
    if (this.state.redirectHome) {
      return <Redirect to={from} />
    }
    
    return(
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
              Welcome to 80/20!
            </Header>
            <Form size='large' >
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="email" onChange={this.handleChange} />
                <Form.Input fluid icon='lock' iconPosition='left'  name='password' placeholder='Password' type='password' onChange={this.handleChange}/>
                <Button fluid color='blue' onClick={this.checkUser}  type="submit" size='large'>Login </Button>
              </Segment>
            </Form>
            <Message>
          New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(getUserFromPassport(user)),
  }
}

export default connect(null, mapDispatchToProps)(SignIn)