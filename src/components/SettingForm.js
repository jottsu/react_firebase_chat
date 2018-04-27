import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { firebaseDb, firebaseAuth } from '../firebaseConfig'

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.currentUser.displayName,
      email: this.props.currentUser.email,
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

  updateUser () {
    const name = this.state.name.trim()
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    if (name === '' || email === '' || password === '') {
      return
    }
  }

  render () {
    return (
      <div className='auth-form'>
        <h2>ユーザー設定</h2>
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
            onClick={() => this.updateUser()}
          >
            更新
          </span>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm)
