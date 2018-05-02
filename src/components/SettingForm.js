import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseDb, firebaseAuth, firebaseSt } from '../firebaseConfig'
import defaultUserImg from '../images/default_user_img.png'

class SettingForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.currentUser.displayName,
      email: this.props.currentUser.email,
      image: this.props.currentUser.photoURL
    }
  }

  changeImage (e) {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    const fr = new FileReader()
    fr.onload = () => {
      const imgNode = this.refs.image
      imgNode.src = fr.result
    }
    fr.readAsDataURL(file)
    this.setState({
      image: file
    })
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

  updateUser () {
    const name = this.state.name.trim()
    const email = this.state.email.trim()
    const image = this.state.image
    if (name === '' || email === '' || image === '') {
      return
    }

    const user = firebaseAuth.currentUser
    const imgRef = firebaseSt.ref('user_images/' + user.uid + '/user_image.jpg')
    imgRef.put(image).then(() => {
      return imgRef.getDownloadURL()
    }).then((imgURL) => {
      firebaseDb.ref('users/' + user.uid).set({
        displayName: name,
        email: email,
        photoURL: imgURL
      })
      user.updateProfile({
        displayName: name,
        email: email,
        photoURL: imgURL
      }).then(() => {
        this.props.setUser(firebaseAuth.currentUser)
        this.props.history.push('/')
      })
    }).catch(err => {
      alert(err)
    })
  }

  render () {
    const imageURL = this.state.image
    const userImgSrc = (imageURL === undefined || imageURL === '' || imageURL === null) ? defaultUserImg : imageURL

    return (
      <div className='auth-form'>
        <h2>ユーザー設定</h2>
        <div className='form-item'>
          <img ref="image" src={userImgSrc} alt='user' className='form-user-img' />
          <label htmlFor='img-file' className='btn btn-inverse'>
            画像を選択
            <input
              type='file'
              id='img-file'
              onChange={(e) => this.changeImage(e)}
            />
          </label>
        </div>
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

export default withRouter(SettingForm)
