import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: {
        uid: '',
        displayName: '',
        email: ''
      }
    }
  }

  setUser (user) {
    this.setState({
      currentUser: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      }
    })
    console.log(`uid: ${this.state.currentUser.uid}, name: ${this.state.currentUser.displayName}, email: ${this.state.currentUser.email}`)
  }

  render () {
    const currentUser = this.state.currentUser

    const authRoutes = (
      <Switch>
        <Route exact path='/' component={ChatRoom} user={currentUser} />
        <Redirect from="/login" to="/" />
        <Redirect from="/signup" to="/" />
      </Switch>
    )

    const unAuthRoutes = (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path='/login' render={() => <LoginForm setUser={(user) => this.setUser(user)} />} />
        <Route path='/signup' render={() => <SignupForm setUser={(user) => this.setUser(user)} />} />
      </Switch>
    )

    return (
      <Router>
        <div>
          <Header user={currentUser} setUser={(user) => this.setUser(user)} />
          {currentUser.uid === '' ? unAuthRoutes : authRoutes}
        </div>
      </Router>
    )
  }
}

export default App
