import React, { Component } from 'react'
import './style.css'
import { firebaseDb } from '../firebaseConfig'

const roomsRef = firebaseDb.ref().child('rooms')

export default class ChatRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formText: '',
      rooms: []
    }
  }

  componentWillMount () {
    roomsRef.on('child_added', snap => {
      const room = snap.val()
      room.key = snap.key
      const rooms = this.state.rooms
      rooms.unshift(room)
      this.setState({
        rooms: rooms
      })
    })
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
    roomsRef.push({
      title: formText,
      founderUid: this.props.currentUser.uid
    })
    this.setState({
      formText: ''
    })
  }

  render () {
    const roomList = this.state.rooms.map((room, i) => (
      <div key={i} className='room-item'>
        <div>{room.title}</div>
        <a href={'/chatroom/' + room.key} className='btn room-enter-btn'>入室</a>
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
