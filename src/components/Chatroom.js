import React, { Component } from 'react'
import './style.css'
import { firebaseDb } from '../firebaseConfig'
import defaultUserImg from '../images/default_user_img.png'

const messagesRef = firebaseDb.ref().child('messages')

export default class ChatRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formText: '',
      messages: []
    }
  }

  componentWillMount () {
    messagesRef.on('child_added', snap => {
      const message = snap.val()
      firebaseDb.ref('users/' + message.userUid).on('value', snap => {
        message.userName = snap.val().displayName
        const messages = this.state.messages
        messages.unshift(message)
        this.setState({
          messages: messages
        })
      })
    })
  }

  changeFormText (e) {
    this.setState({
      formText: e.target.value
    })
  }

  submitMessage () {
    const formText = this.state.formText.trim()
    if (formText === '') {
      return
    }
    messagesRef.push({
      text: formText,
      userUid: this.props.currentUser.uid
    })
    this.setState({
      formText: ''
    })
  }

  render () {
    const myMessageClassName = (message) => {
      if (message.userUid === this.props.currentUser.uid) {
        return ' my-message'
      }
      return ''
    }

    const messageList = this.state.messages.map((message, i) => (
      <div key={i} className={'message-container' + myMessageClassName(message)}>
        <div className='message-item clearfix'>
          <div className='message-img-container'>
            <img src={defaultUserImg} alt='user' className='user-img' />
          </div>
          <div className='message-text-container'>
            <div className='message-user-name'>
              {message.userName}
            </div>
            <div className='message-text'>
              {message.text}
            </div>
          </div>
        </div>
      </div>
    ))

    return (
      <div>
        <div className='message-form-container'>
          <div className='message-form'>
            <input
              value={this.state.formText}
              onChange={e => this.changeFormText(e)}
            />
            <span
              className='btn'
              onClick={() => this.submitMessage()}
            >
              送信
            </span>
          </div>
        </div>
        <div className='message-list-container'>
          <div className='message-list'>
            {messageList}
          </div>
        </div>
      </div>
    )
  }
}
