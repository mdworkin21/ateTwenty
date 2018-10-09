import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import { timingSafeEqual } from 'crypto';


class SearchImg extends Component {
  constructor(){
    super()
    this.state = {
      image: ''
    }
    this.accessCamera = this.accessCamera.bind(this)
  }

  accessCamera(event){
    console.log('pooper', event.target.files[0].name)
    this.setState({
      [event.target.name]: event.target.files[0].name
    })
  }
  
  
  
  render(){
    return(
        <React.Fragment>
          <Form>
          <input name='image' type="file" accept="image/*" onChange={this.accessCamera} value=''/>
          </Form>

        </React.Fragment>
      
    )
  }
}

export default SearchImg