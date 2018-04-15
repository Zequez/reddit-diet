import React, { Component } from 'react'
import th from './App.sass'
import Api from '../services/api'
import Url from '../services/url'
import ConfigPanel from './ConfigPanel'
import Subs from './Subs'

export default class App extends Component {
  state = {
    markedAsRead: [],
    currentPostUrl: null,
    settings: {
      mode: 'top_week',
      readPostsMode: true,
      configVisible: true,
      subs: ['argentina', 'javascript', 'webdev']
    },
    settingsLoaded: false
  }

  componentWillMount () {
    Api.markedAsRead.list().then((markedAsRead) => this.setState({markedAsRead}))
    Api.userSettings.get().then((settings) => {
      if (settings && settings.subs) {
        this.setState({settingsLoaded: true, settings})
      } else {
        Api.userSettings.set(settings)
        this.setState({settingsLoaded: true})
      }
    })
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

  setSetting = (setting, value) => {
    let settings = {...this.state.settings, [setting]: value}
    this.setState({settings})
    Api.userSettings.set(settings)
  }

  render () {
    let { settings, markedAsRead, currentPostUrl, settingsLoaded } = this.state
    return settingsLoaded ? (
      <div className={th.App}>
        <div className={th.App__sidebar}>
          <div className={th.Header}>
            <button
              className={th.Header__configButton}
              onClick={() => this.setSetting('configVisible', !settings.configVisible)}>
              +
            </button>
            <h1>Reddit Diet</h1>
          </div>
          {settings.configVisible ? (
            <ConfigPanel
              onSettingChanges={this.setSetting}
              settings={settings}/>
          ) : null}
          <Subs
            subreddits={settings.subs}
            markedAsRead={markedAsRead}
            readPostsMode={settings.readPostsMode}
            mode={settings.mode}
            onMarkAsRead={this.markAsRead}
            onOpenPost={this.openPost}/>
        </div>
        <div className={th.PostFrame}>
          <iframe src={currentPostUrl}></iframe>
        </div>
      </div>
    ) : null;
  }
}
