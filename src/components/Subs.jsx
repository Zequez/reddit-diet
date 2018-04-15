import th from  './Subs.sass'
import React from 'react'
import cx from 'classnames'
import Sub from './Sub'

type Props = {
  subreddits: String[],
  markedAsRead: String[],
  onMarkAsRead: Function,
  onOpenPost: Function
}

console.log(th)

const MODES = ['hot', 'top_day', 'top_week', 'top_month']

export default class Subs extends React.Component {
  props : Props

  state = {
    mode: 'top_week'
  }

  setMode = (mode) => {
    this.setState({mode: mode})
  }

  render () {
    let { subreddits, markedAsRead, onMarkAsRead, onOpenPost } = this.props
    let { mode } = this.state

    return (
      <div className={th.Subs}>
        <div className={th.__modes}>
          {MODES.map((m) =>
            <button
              key={m}
              className={cx(th.__mode, {[th.__mode_active]: m === mode})}
              onClick={() => this.setMode(m)}>
              {m}
            </button>
          )}
        </div>
        <ul className={th.SubsList}>
          {subreddits.map((sub) => (
            <Sub
              key={sub}
              subreddit={sub}
              markedAsRead={markedAsRead}
              onMarkAsRead={onMarkAsRead}
              onOpenPost={onOpenPost}
              limit={10}
              mode={mode}/>
          ))}
        </ul>
      </div>
    )
  }
}
