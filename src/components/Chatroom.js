import React, { Component } from 'react'
import './chatroom.css';

export default class Chatroom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formText: '',
      messages: []
    }
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
    const messages = this.state.messages
    messages.push({
      text: formText
    })
    this.setState({
      formText: '',
      messages: messages
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
