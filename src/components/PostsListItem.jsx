import React from 'react'
import th from './PostsListItem.sass'
import cx from 'classnames'

const redditUrl = (permalink) => `https://www.reddit.com${permalink}`

export default ({post, isRead, onSelect}) => {
  let onClickLink = (ev) => {
    ev.preventDefault()
    return false
  }

  let onMouseDown = (ev) => {
    onSelect(post.id, redditUrl(post.permalink))
  }

  let classNames = cx(th.PostsListItem, {
    [th.__read]: isRead
  })

  return (
    <li className={classNames} key={post.id}>
      <a href={post.url} onMouseDown={onMouseDown} onClick={onClickLink} target='_blank'>
        <div className={th.__img}>
          {post.thumbnail ? <img src={post.thumbnail} alt='img'/> : null}
        </div>
        <div className={th.__scores}>
          <div className={th.__score} title='Upvotes'>
            {post.score}
          </div>
          <div className={th.__comments} title='Comments'>
            {post.num_comments}
          </div>
        </div>
        <div className={th.__title} title={post.title}>
          {post.title}
        </div>
      </a>
    </li>
  )
}
