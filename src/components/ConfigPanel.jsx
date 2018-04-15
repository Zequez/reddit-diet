import React from 'react'
import t from 'prop-types';
import cx from 'classnames'
import th from './ConfigPanel.sass'

const MODES = {
  hot: 'Hot',
  top_day: 'Top Day',
  top_week: 'Top Week',
  top_month: 'Top Month'
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
    let { mode, readPostsMode } = this.props.settings
    let { subs } = this.state

    return (
      <div className={th.ConfigPanel}>
        <div className={th.__modes}>
          {Object.keys(MODES).map((m) =>
            <button
              key={m}
              className={cx(th.__mode, {[th.__mode_active]: m === mode})}
              onClick={() => this.props.onSettingChanges('mode', m)}>
              {MODES[m]}
            </button>
          )}
        </div>
        <div className={th.__subs}>
          <div>Subs</div>
          <input type='text' value={this.state.subs} onChange={this.setSubs} onBlur={this.propagateSubs}/>
        </div>
        <label className={th.__readPostsMode}>
          <input
            type='checkbox'
            checked={readPostsMode}
            onChange={() => this.props.onSettingChanges('readPostsMode', !readPostsMode)}/>
          <span>Fade out read posts</span>
        </label>
      </div>
    )
  }
}
