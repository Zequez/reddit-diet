import React from 'react'
import t from 'prop-types';
import cx from 'classnames'

import th from  './Subs.sass'
import Sub from './Sub'

export default class Subs extends React.Component {
  props: {
    subreddits: t.array.isRequired,
    markedAsRead: t.array.isRequired,
    onMarkAsRead: t.func.isRequired,
    onOpenPost: t.func.isRequired,
    mode: t.string.isRequired,
    readPostsMode: t.bool.isRequired,
    postsPerSub: t.number.isRequired,
  }

  render () {
    let { mode, readPostsMode, subreddits, markedAsRead, onMarkAsRead, onOpenPost, postsPerSub } = this.props

    return (
      <div className={th.Subs}>
        <ul className={th.SubsList}>
          {subreddits.map((sub) => (
            <Sub
              key={sub}
              subreddit={sub}
              markedAsRead={markedAsRead}
              onMarkAsRead={onMarkAsRead}
              onOpenPost={onOpenPost}
              limit={postsPerSub}
              mode={mode}
              readPostsMode={readPostsMode}/>
          ))}
        </ul>
      </div>
    )
  }
}
