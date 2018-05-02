import React, { Component } from 'react'
import defaultUserImg from '../images/default_user_img.png'

export default class UserImage extends Component {
  render () {
    const imageURL = this.props.imageURL
    const userImgSrc = (imageURL === undefined || imageURL === '' || imageURL === null) ? defaultUserImg : imageURL

    return (
      <img src={userImgSrc} ref={this.props.ref} alt='user' className='user-img' />
    )
  }
}
