import React from 'react'
import t from 'prop-types'
import cx from 'classnames'
import th from './ConfigPanel.sass'

import HotSelect from './HotSelect'

const MODES = {
  hot: 'Hot',
  top_day: 'Top Day',
  top_week: 'Top Week',
  top_month: 'Top Month'
}

const HIDE_MODES = {
  fade: 'Fade Out',
  hide: 'Hide'
}

export default class ConfigPanel extends React.Component {
  propTypes: {
    // settings: t.shape({
    //   mode: t.string.isRequired,
    //   subs: t.array.isRequired,
    //   readPostsMode: t.bool.isRequired,
    // }),
    onSettingChanges: t.func
  }

  state = {
    subs: '',
    postsPerSub: 0
  }

  componentWillMount () {
    this.setState({
      subs: this.props.settings.subs.join(', '),
      postsPerSub: this.props.settings.postsPerSub
    })
  }

  setSubs = (ev) => {this.setState({subs: ev.target.value})}
  setPostsPerSub = (ev) => {this.setState({postsPerSub: ev.target.value})}

  propagateSubs = (ev) => {
    let subs = this.state.subs.trim().split(/\s*,\s*/).filter((v) => !!v)
    this.props.onSettingChanges('subs', subs)
  }

  propagatePostsPerSub = () => {
    let postsPerSub = parseInt(this.state.postsPerSub) || 10
    this.props.onSettingChanges('postsPerSub', postsPerSub)
    if (this.state.postsPerSub !== postsPerSub.toString()) this.setState({postsPerSub})
  }

  render () {
    let { mode, readPostsMode, markedAsRead } = this.props.settings
    let { subs, postsPerSub } = this.state

    let sett = this.props.onSettingChanges

    return (
      <div className={th.ConfigPanel}>

        <HotSelect
          label='Posts'
          options={MODES}
          selected={mode}
          onChange={(m) => this.props.onSettingChanges('mode', m)}/>

        <div className={th.__subs}>
          <div>Subs</div>
          <input
            type='text'
            value={this.state.subs}
            onChange={this.setSubs}
            onBlur={this.propagateSubs}/>
        </div>

        <HotSelect
          label='Read Posts'
          options={HIDE_MODES}
          selected={readPostsMode ? 'fade' : 'hide'}
          onChange={(m) => sett('readPostsMode', m === 'fade')}/>

        <div className={th.__cleanReadPosts}>
          <button
            onClick={() => sett('markedAsRead', [])}>
            Clear read posts data
          </button>
          ({markedAsRead.length} posts marked as read)
        </div>

        <div className={th.__postsPerSub}>
          <div>Posts Per Sub</div>
          <input
            type='number'
            value={postsPerSub}
            onChange={this.setPostsPerSub}
            onBlur={this.propagatePostsPerSub}/>
        </div>
      </div>
    )
  }
}
