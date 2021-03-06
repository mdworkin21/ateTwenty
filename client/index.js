import React from 'react'
import ReactDOM from 'react-dom'
import Homepage from './components/Homepage'
import MacroCalc from './components/MacroCalc'
import Log from './components/Log'
import SignIn from './components/SignIn'
import Landing from './components/Landing'
import SignUp from './components/Signup'
import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SearchPage from './components/SearchPage';
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/calc" component={MacroCalc} />
          <Route exact path="/log" component={Log} />
          <Route exact path="/search" component={SearchPage} />
      </Switch>
   </Router>
  </Provider>, 
  document.getElementById('root'))