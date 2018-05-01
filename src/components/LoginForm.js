import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../firebaseConfig'

class LoginForm extends Component {
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

  login () {
    firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.props.history.push('/')
    }).catch(err => {
      alert(err)
    })
  }

  render () {
    return (
      <div className='auth-form'>
        <h2>ログイン</h2>
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
            onClick={() => this.login()}
          >
            ログイン
          </span>
        </div>
        <div className='form-item'>
          <a href='/signup' className='btn btn-inverse'>
            まだ登録されてない方はこちら
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)
