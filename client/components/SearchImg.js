import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import ImgResults from './ImgResults'

class SearchImg extends Component {
  constructor(){
    super()
    this.state = {
      image: '',
      concepts: []
    }
   this.gotStream = this.gotStream.bind(this)
   this.grabWebCamVideo = this.grabWebCamVideo.bind(this)
   this.snapPhoto = this.snapPhoto.bind(this)
   this.sendPhoto = this.sendPhoto.bind(this)
  }


  async sendPhoto() {
    let sentImage = await axios.post('/api/clarifai', {file: this.photo.toDataURL()})
    let concepts = sentImage.data.rawData.outputs[0].data.concepts
    this.setState({
      concepts: concepts
    })
   
  }
  
  grabWebCamVideo() {
    console.log('Getting user media (video) ...');
    navigator.mediaDevices.getUserMedia({
      video: true,
      facingMode: 'environment' ? 'environment' : 'user'
    })
    .then(this.gotStream)
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }
  
  gotStream(stream) {
    let photo = this.photo 
    console.log('getUserMedia video stream URL:', stream);
    window.stream = stream; // stream available to console
    this.video.srcObject = stream;
    this.video.onloadedmetadata = function() {
      photo.width = 200;
      photo.height = 200;
    };
  }
  
  snapPhoto() {
    let photoContext = this.photo.getContext('2d')
    photoContext.drawImage(this.video, 0, 0, this.photo.width, this.photo.height);   
    this.video.srcObject.getTracks()[0].stop()
  }

  render(){ 
    return(
        <React.Fragment>
          <div id="videoCanvas">
            <video autoPlay playsInline ref={(input) => this.video = input}></video>
            <canvas ref={(input) => this.photo = input}></canvas>
            <button onClick={this.grabWebCamVideo}>CAM ON</button>
            <button onClick ={this.sendPhoto}>SUBMIT</button>
          </div>  

          <div id="buttons">
            <button ref={(input) => this.snapBtn = input} onClick={this.snapPhoto}>Snap</button>
          </div>
        <ImgResults concepts={this.state.concepts} />

        </React.Fragment>
      
    )
  }
}

export default SearchImg

