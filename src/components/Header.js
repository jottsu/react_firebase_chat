import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../firebaseConfig'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  changeMenuStatus () {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  logout () {
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

    const headerMenu = this.state.menuOpen ? (
      <div className='header-menu'>
        <ul>
          <li>
            <a href='/setting'>ユーザー設定</a>
          </li>
          <li>
            <span onClick={() => this.logout()}>ログアウト</span>
          </li>
        </ul>
      </div>
    ) : (
      <div></div>
    )

    const headerBtn = (currentUser.uid === '') ? (
      <div></div>
    ) : (
      <div>
        <div
          className='header-btn'
          onClick={() => this.changeMenuStatus()}
        >
          <span className="user-name" >
            {currentUser.displayName}
          </span>
        </div>
        {headerMenu}
      </div>
    )

    return (
      <header>
        <a href='/' className='icon'>Chat</a>
        {headerBtn}
      </header>
    )
  }
}

export default withRouter(Header)
