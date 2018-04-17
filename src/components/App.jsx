import React, { Component } from 'react'
import cx from 'classnames'
import th from './App.sass'
import Api from '../services/api'
import Url from '../services/url'
import ConfigPanel from './ConfigPanel'
import Subs from './Subs'

export default class App extends Component {
  state = {
    currentPostUrl: null,
    settings: {
      mode: 'top_week',
      readPostsMode: true,
      configVisible: true,
      subs: ['argentina', 'worldnews day 5', 'EarthPorn+NaturePorn+SpacePorn', 'all', 'webdev month 10', 'javascript month 10'],
      markedAsRead: [],
      postsPerSub: 10
    },
    settingsLoaded: false
  }

  componentWillMount () {
    Api.userSettings.get().then((settings) => {
      Object.keys(this.state.settings).forEach((k) => {
        if (settings[k] == null) settings[k] = this.state.settings[k]
      })
      this.setState({settingsLoaded: true, settings})
      Api.userSettings.set(settings)
    })
  }

  markAsRead = (postsId) => {
    postsId = postsId instanceof Array ? postsId : [postsId]

    let markedAsRead = this.state.settings.markedAsRead.concat([])

    postsId.forEach((postId) => {
      if (!~markedAsRead.indexOf(postId)) { markedAsRead.push(postId) }
    })

    this.setSetting('markedAsRead', markedAsRead)
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
    let { settings, currentPostUrl, settingsLoaded } = this.state
    return settingsLoaded ? (
      <div className={th.App}>
        <div className={th.App__sidebar}>
          <div className={th.Header}>
            <button
              className={cx(th.Header__configButton, {toggled: settings.configVisible})}
              onClick={() => this.setSetting('configVisible', !settings.configVisible)}>
              <i className='fas fa-cog'></i>
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
            markedAsRead={settings.markedAsRead}
            readPostsMode={settings.readPostsMode}
            mode={settings.mode}
            postsPerSub={settings.postsPerSub}
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
