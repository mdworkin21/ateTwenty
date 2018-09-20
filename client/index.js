//Root. Call ReactDOM.Render and serviceWorker here.
//React Router stuff here
//Set up Provider for Redux
import React from 'react'
import ReactDOM from 'react-dom'
import Homepage from './components/Homepage'
import MacroCalc from './components/MacroCalc'

import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router>
  <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/calc" component={MacroCalc} />

  </Switch>
   </Router>
  </Provider>, 
  document.getElementById('root'))