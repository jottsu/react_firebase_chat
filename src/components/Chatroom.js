import React, { Component } from 'react'
import './chatroom.css'
import { firebaseDb } from '../firebaseConfig'

const messagesRef = firebaseDb.ref().child('messages')

export default class Chatroom extends Component {
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
      const messages = this.state.messages
      messages.unshift(message)
      this.setState({
        messages: messages
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
    })
    this.setState({
      formText: ''
    })
  }

  render () {
    const messageList = this.state.messages.map((message, i) => (
      <div key={i} className='message-container'>
        <div className='message'>
          {message.text}
        </div>
      </div>
    ))

    return (
      <div>
        <div className='form-container'>
          <div className='form'>
            <input
              value={this.state.formText}
              onChange={e => this.changeFormText(e)}
            />
            <span
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
