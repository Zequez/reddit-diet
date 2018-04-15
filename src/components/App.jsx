import React, { Component } from 'react'
import th from './App.sass'
import Api from '../services/api'
import Url from '../services/url'
import Subs from './Subs'

export default class App extends Component {
  state = {
    markedAsRead: [],
    subreddits: [],
    currentPostUrl: null
  }

  componentWillMount () {
    this.setState({subreddits: Url.subreddits()})
    Api.markedAsRead.list().then((markedAsRead) => this.setState({markedAsRead}))
  }

  markAsRead = (postId) => {
    let markedAsRead = this.state.markedAsRead.concat(postId)
    Api.markedAsRead.add(postId)

    this.setState({markedAsRead})
  }

  openPost = (postId, postUrl) => {
    this.markAsRead(postId)
    this.setState({currentPostUrl: postUrl})
  }

  render () {
    let { subreddits, markedAsRead, currentPostUrl } = this.state

    return (
      <div className={th.App}>
        <div className={th.App__sidebar}>
          <div className={th.Header}>
            <h1>Reddit Diet</h1>
          </div>
          <Subs
            subreddits={subreddits}
            markedAsRead={markedAsRead}
            onMarkAsRead={this.markAsRead}
            onOpenPost={this.openPost}/>
        </div>
        <div className={th.PostFrame}>
          <iframe src={currentPostUrl}></iframe>
        </div>
      </div>
    );
  }
}
