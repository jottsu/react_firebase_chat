import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../firebaseConfig'
import UserImage from './UserImage'

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
    firebaseAuth.signOut().catch(err => {
      alert(err)
    })
    this.changeMenuStatus()
    this.props.history.push('/login')
  }

  render() {
    const currentUser = this.props.currentUser

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
          <UserImage imageURL={currentUser.photoURL} />
          <div className="user-name" >
            {currentUser.displayName}
          </div>
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
