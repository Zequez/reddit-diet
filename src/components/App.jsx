import React, { Component } from 'react'
import th from './App.sass'
import Api from '../services/api'
import Url from '../services/url'
import ConfigPanel from './ConfigPanel'
import Subs from './Subs'

export default class App extends Component {
  state = {
    markedAsRead: [],
    subreddits: [],
    currentPostUrl: null,
    configVisible: false,
    mode: 'top_week',
    readPostsMode: true
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

  toggleConfig = () => { this.setState({configVisible: !this.state.configVisible}) }
  setMode = (mode) => { this.setState({mode: mode}) }
  setSubs = (subs) => { this.setState({subreddits: subs}) }
  setReadPostsMode = (readPostsMode) => { this.setState({readPostsMode: readPostsMode}) }

  render () {
    let { mode, subreddits, readPostsMode, markedAsRead, currentPostUrl, configVisible } = this.state

    return (
      <div className={th.App}>
        <div className={th.App__sidebar}>
          <div className={th.Header}>
            <button className={th.Header__configButton} onClick={this.toggleConfig}>
              ⚙︎
            </button>
            <h1>Reddit Diet</h1>
          </div>
          {configVisible ? (
            <ConfigPanel
              mode={mode}
              subs={subreddits}
              readPostsMode={readPostsMode}
              onModeChange={this.setMode}
              onSubsChange={this.setSubs}
              onReadPostsModeChange={this.setReadPostsMode}/>
          ) : null}
          <Subs
            subreddits={subreddits}
            markedAsRead={markedAsRead}
            readPostsMode={readPostsMode}
            mode={mode}
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
