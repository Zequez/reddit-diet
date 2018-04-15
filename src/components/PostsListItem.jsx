import React from 'react'
import './PostsListItem.sass'
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

  let classNames = cx('PostsListItem', {
    'PostsListItem_read': isRead
  })

  // console.log(post)
  // console.log(post.thumbnail)


  return (
    <li className={classNames} key={post.id}>
      <div className='PostsListItem__img'>
        {post.thumbnail ? <img src={post.thumbnail} alt='img'/> : null}
      </div>
      <div className='PostsListItem__scores'>
        <div className='PostsListItem__score'>
          {post.score}
        </div>
        <div className='PostsListItem__comments'>
          {post.num_comments}
        </div>
      </div>
      <a href={post.url} onMouseDown={onMouseDown} onClick={onClickLink} className='PostsListItem__title' target='_blank'>
        {post.title}
      </a>
    </li>
  )
}
