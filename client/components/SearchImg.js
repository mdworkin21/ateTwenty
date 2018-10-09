import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";



class SearchImg extends Component {
  constructor(){
    super()
    this.state = {
      image: ''
    }
    this.accessCamera = this.accessCamera.bind(this)
  }

  async accessCamera(event){

    console.log(this.state.image)
    this.setState({
      [event.target.name]: event.target.files[0]
    })
    //Some utility function here that manipulates image
    // const image = await axios.post('/api/clarifai', event.target.files[0])
    // console.log('IMG', "IMGDATAOUTPUTS", image.data.outputs[0].data.concepts)
  }
  
  
  render(){
    console.log('STATE', this.state)
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