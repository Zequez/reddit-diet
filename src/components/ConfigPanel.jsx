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
    subs: ''
  }

  componentWillMount () {
    this.setState({subs: this.props.settings.subs.join(', ')})
  }

  setSubs = (ev) => {this.setState({subs: ev.target.value})}

  propagateSubs = (ev) => {
    let subs = this.state.subs.trim().split(/\s*,\s*/).filter((v) => !!v)
    this.props.onSettingChanges('subs', subs)
  }

  render () {
    let { mode, readPostsMode, markedAsRead } = this.props.settings
    let { subs } = this.state

    return (
      <div className={th.ConfigPanel}>

        <HotSelect
          label='Posts'
          options={MODES}
          selected={mode}
          onChange={(m) => this.props.onSettingChanges('mode', m)}/>

        <div className={th.__subs}>
          <div>Subs</div>
          <input type='text' value={this.state.subs} onChange={this.setSubs} onBlur={this.propagateSubs}/>
        </div>
        <HotSelect
          label='Read Posts'
          options={HIDE_MODES}
          selected={readPostsMode ? 'fade' : 'hide'}
          onChange={(m) => this.props.onSettingChanges('readPostsMode', m === 'fade')}/>
        <div className={th.__cleanReadPosts}>
          <button
            onClick={() => this.props.onSettingChanges('markedAsRead', [])}>
            Clear read posts data
          </button>
          ({markedAsRead.length} posts marked as read)
        </div>
      </div>
    )
  }
}
