//Root. Call ReactDOM.Render and serviceWorker here.
//React Router stuff here
//Set up Provider for Redux
import React from 'react'
import ReactDOM from 'react-dom'
import Homepage from './components/Homepage'
import store from './store'
import {Provider} from 'react-redux'
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Homepage />
  </Provider>, 
  document.getElementById('root'))