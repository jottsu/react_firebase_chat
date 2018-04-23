import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ChatRoom} user={this.state.user} />
          <Route path='/login' component={LoginForm} setUser={(user) => this.setUser(user)} />
          <Route path='/signup' component={SignupForm} setUser={(user) => this.setUser(user)} />
        </div>
      </Router>
    )
  }
}

export default App
