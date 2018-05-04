import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { firebaseAuth } from './firebaseConfig'
import RoomList from './components/RoomList'
import ChatRoom from './components/ChatRoom'
import SettingForm from './components/SettingForm'
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
        email: '',
        photoURL: ''
      },
      isLoaded: false
    }
  }


  componentWillMount () {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }
        })
      } else {
        this.setState({
          currentUser: {
            uid: '',
            displayName: '',
            email: '',
            photoURL: ''
          }
        })
      }
      console.log(`(changed) uid: ${this.state.currentUser.uid}, name: ${this.state.currentUser.displayName}, email: ${this.state.currentUser.email}, photoURL: ${this.state.currentUser.photoURL}`)
      this.setState({
        isLoaded: true
      })
    })
  }

  setUser (user) {
    this.setState({
      currentUser: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }
    })
  }

  render () {
    const currentUser = this.state.currentUser

    const authRoutes = (
      <Switch>
        <Route exact path='/' render={() => <RoomList />} />
        <Route exact path='/chatroom' render={() => <ChatRoom currentUser={currentUser} />} />
        <Route path='/setting' render={() => <SettingForm currentUser={currentUser} setUser={(user) => this.setUser(user)} />} />
        <Redirect from="/login" to="/" />
        <Redirect from="/signup" to="/" />
      </Switch>
    )

    const unAuthRoutes = (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Redirect from="/chatroom" to="/login" />
        <Redirect from="/setting" to="/login" />
        <Route path='/login' render={() => <LoginForm />} />
        <Route path='/signup' render={() => <SignupForm setUser={(user) => this.setUser(user)} />} />
      </Switch>
    )

    if (!this.state.isLoaded) {
      return (
        <Router>
          <Header currentUser={currentUser} setUser={(user) => this.setUser(user)} />
        </Router>
      )
    }

    return (
      <Router>
        <div>
          <Header currentUser={currentUser} setUser={(user) => this.setUser(user)} />
          {currentUser.uid === '' ? unAuthRoutes : authRoutes}
        </div>
      </Router>
    )
  }
}

export default App
