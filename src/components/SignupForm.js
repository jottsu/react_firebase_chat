import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../firebaseConfig'

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  changeName (e) {
    this.setState({
      name: e.target.value
    })
  }

  changeEmail (e) {
    this.setState({
      email: e.target.value
    })
  }

  changePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  signup () {
    const name = this.state.name.trim()
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    if (name === '' || email === '' || password === '') {
      return
    }
    firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      return user.updateProfile({
        displayName: name
      }).then(() => {
        this.props.setUser(firebaseAuth.currentUser)
        this.props.history.push('/')
      })
    })
    .catch(err => {
      alert(err)
    })
  }

  render () {
    return (
      <div className='auth-form'>
        <h2>新規登録</h2>
        <div className='form-item'>
          <input
            value={this.state.name}
            placeholder='ユーザー名'
            onChange={(e) => this.changeName(e)}
          />
        </div>
        <div className='form-item'>
          <input
            value={this.state.email}
            placeholder='メールアドレス'
            onChange={(e) => this.changeEmail(e)}
          />
        </div>
        <div className='form-item'>
          <input
            type='password'
            value={this.state.password}
            placeholder='パスワード'
            onChange={(e) => this.changePassword(e)}
          />
        </div>
        <div className='form-item'>
          <span
            className='btn'
            onClick={() => this.signup()}
          >
            登録
          </span>
        </div>
        <div className='form-item'>
          <a href='/login' className='btn btn-inverse'>
            登録済みの方はこちら
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm)
