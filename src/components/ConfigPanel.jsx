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
  props: {
    mode: t.string.isRequired,
    subs: t.array.isRequired,
    readPostsMode: t.bool.isRequired,
    onModeChange: t.func,
    onSubsChange: t.func,
    onReadPostsModeChange: t.func
  }

  state = {
    subs: ''
  }

  componentWillMount () {
    this.setState({subs: this.props.subs.join(', ')})
  }

  setSubs = (ev) => {
    let subs = ev.target.value
    this.setState({subs})
    this.onSubsChange(subs.trim().split(/\s*,\s*/))
  }

  render () {
    let { mode, readPostsMode } = this.props
    let { subs } = this.state

    return (
      <div className={th.ConfigPanel}>
        <div className={th.__modes}>
          {Object.keys(MODES).map((m) =>
            <button
              key={m}
              className={cx(th.__mode, {[th.__mode_active]: m === mode})}
              onClick={() => this.props.onModeChange(m)}>
              {MODES[m]}
            </button>
          )}
        </div>
        <div className={th.__subs}>
          <div>Subs</div>
          <input type='text' value={this.state.subs} onChange={this.setSubs}/>
        </div>
        <label className={th.__readPostsMode}>
          <input type='checkbox' checked={readPostsMode} onChange={() => this.props.onReadPostsModeChange(!readPostsMode)}/>
          <span>Fade out read posts</span>
        </label>
      </div>
    )
  }
}
