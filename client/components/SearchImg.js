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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

 
  accessCamera(event){ 
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }
  
  uploadFile(e) {
    let ctx = this.refs.canvas.getContext('2d');
    let url = URL.createObjectURL(e.target.files[0]);
    let img = new Image();
 
    img.src = url;
    img.onload = function () {    
        ctx.drawImage(img, 0, 0, 600, 600,
             0, 0, 200, 200);    
    }
 
    let dataImg = this.refs.canvas.toDataURL();
    console.log(dataImg);
 }

  async handleSubmit(event){
    console.log(this.state)
    event.preventDefault()

    let ctx = this.refs.canvas.getContext('2d');
    let url = URL.createObjectURL(this.state.image);
    let img = new Image();
 
    img.src = url;
    img.onload = function () {    
        ctx.drawImage(img, 0, 0, 600, 600,
             0, 0, 200, 200);    
    }
    //Is this in base64?
    let dataImg = this.refs.canvas.toDataURL();
    console.log('DM',dataImg);
    

    // Some utility function here that manipulates image^
    const image = await axios.post('/api/clarifai', {dataImg})
    console.log('IMG', "IMGDATAOUTPUTS", image.data.outputs[0].data.concepts)

  }
  
  render(){
    // console.log(this.state.image, this.refs.canvas)

    return(
        <React.Fragment>
          <Form>
          <input name='image' type="file" accept="image/*" onChange={this.accessCamera} />
          <Button onClick={this.handleSubmit} />
          </Form>
          <canvas ref="canvas" width={640} height={425} />
          <img ref="image" src={this.state.image}/>
        </React.Fragment>
      
    )
  }
}

export default SearchImg