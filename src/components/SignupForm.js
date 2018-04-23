import React, { Component } from 'react'
import { firebaseAuth } from '../firebaseConfig'

export default class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
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
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    if (email === '' || password === '') {
      return
    }
    firebaseAuth.createUserWithEmailAndPassword(email, password)
  }

  render () {
    return (
      <div className='auth-form'>
        <h2>新規登録</h2>
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
