import React, { Component } from 'react'
import './style.css'
import { firebaseDb } from '../firebaseConfig'

export default class ChatRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formText: '',
      rooms: [
        {
          title: 'ルーム1',
          founder_uid: ''
        },
        {
          title: 'ルーム2',
          founder_uid: ''
        },
        {
          title: 'ルーム3',
          founder_uid: ''
        }
      ]
    }
  }

  componentWillMount () {
  }

  changeFormText (e) {
    this.setState({
      formText: e.target.value
    })
  }

  craeteRoom () {
    const formText = this.state.formText.trim()
    if (formText === '') {
      return
    }
    // roomsRef.push({
    //   text: formText,
    //   founderUid: this.props.currentUser.uid
    // })
    const rooms = this.state.rooms
    rooms.unshift({ title: formText, founder: ''})
    this.setState({
      formText: '',
      rooms: rooms
    })
  }

  render () {
    const roomList = this.state.rooms.map((room, i) => (
      <div key={i} className='room-item'>
        <div>{room.title}</div>
        <a href='/chatroom' className='btn room-enter-btn'>入室</a>
      </div>
    ))

    return (
      <div>
        <div className='message-form-container'>
          <div className='message-form'>
            <input
              value={this.state.formText}
              placeholder='新規ルーム名'
              onChange={e => this.changeFormText(e)}
            />
            <span
              className='btn'
              onClick={() => this.craeteRoom()}
            >
              作成
            </span>
          </div>
        </div>
        <div className='room-list-container'>
          <div className='room-list'>
            {roomList}
          </div>
        </div>
      </div>
    )
  }
}
