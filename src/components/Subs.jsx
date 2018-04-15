import React from 'react'
import cx from 'classnames'
import './Subs.sass'
import Sub from './Sub'

type Props = {
  subreddits: String[],
  markedAsRead: String[],
  onMarkAsRead: Function,
  onOpenPost: Function
}

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
      <div className='Subs'>
        <div className='Subs__modes'>
          {MODES.map((m) =>
            <button
              key={m}
              className={cx('Subs__mode', {Subs__mode_active: m === mode})}
              onClick={() => this.setMode(m)}>
              {m}
            </button>
          )}
        </div>
        <ul className='SubsList'>
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
