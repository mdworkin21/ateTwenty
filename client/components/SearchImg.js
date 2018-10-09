import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import { timingSafeEqual } from 'crypto';


class SearchImg extends Component {
  constructor(){
    super()
    this.state = {
      whatever: ''
    }
    this.accessCamera = this.accessCamera.bind(this)
  }

  accessCamera(){
    console.log('pooper')
  }

  render(){
    return(
        <React.Fragment>
          <Form>
          <input type="file" accept="image/*"/>
          {/* <Button onClick={this.accessCamera} label="camera"/> */}

          </Form>

        </React.Fragment>
      
    )
  }
}

export default SearchImg