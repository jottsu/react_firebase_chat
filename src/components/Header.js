import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../firebaseConfig'

class Header extends Component {
  logout() {
    firebaseAuth.signOut()
    .then(() => {
      const user = {
        uid: '',
        displayName: '',
        email: ''
      }
      this.props.setUser(user)
    })
    .catch(err => {
      alert(err)
    })
    this.props.history.push('/login')
  }

  render() {
    const currentUser = this.props.user
    const content = (currentUser.uid === '') ? (
      <div></div>
    ) : (
      <div>
        <span
          className='btn'
          onClick={() => this.logout()}
        >
          ログアウト
        </span>
        <span>{currentUser.email}でログインしています</span>
      </div>
    )
    return (
      <header>
        {content}
      </header>
    )
  }
}

export default withRouter(Header)
