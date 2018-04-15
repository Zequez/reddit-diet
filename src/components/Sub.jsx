import React from 'react'
import th from './Sub.sass'
import cx from 'classnames'
import PostsListItem from './PostsListItem'

type Props = {
  subreddit: String,
  markedAsRead: String[],
  onMarkAsRead: Function,
  onOpenPost: Function,
  limit: Number,
  mode: 'hot' | 'top_day' | 'top_week' | 'top_month'
}

export default class Sub extends React.Component {
  props : Props

  state = {
    posts: [],
    forceShow: false
  }

  componentWillMount () {
    this.fetchPosts()
  }

  componentWillReceiveProps (props) {
    if (props.mode !== this.props.mode) {
      this.fetchPosts(props)
    }
  }

  fetchPosts (props = this.props) {
    let { limit, mode, subreddit } = props
    let isTopMode = !!~['top_day', 'top_week', 'top_month'].indexOf(mode)
    let url = ['https://www.reddit.com/r/']

    url.push(subreddit)
    if (isTopMode) url.push('/top')
    url.push('.json')
    url.push(`?limit=${limit}`)
    if (isTopMode) url.push(`&sort=top&t=${mode.slice(4)}`)

    fetch(url.join(''))
      .then((data) => data.json())
      .then((data) => this.setState({
        posts: data.data.children.map((p) => p.data)
      }))
  }

  isAllRead () {
    return this.state.posts.every((p) => ~this.props.markedAsRead.indexOf(p.id))
  }

  markAllAsRead = () => {
    let ids = this.state.posts.map((p) => p.id)
    this.props.onMarkAsRead(ids)
  }

  toggleForceShow = () => {
    this.setState({forceShow: !this.state.forceShow})
  }

  render () {
    let { subreddit, onOpenPost, markedAsRead } = this.props
    let { posts, forceShow } = this.state

    let allRead = this.isAllRead()

    let classNames = cx(th.Sub, {
      [th.__allRead]: allRead
    })

    return (
      <li className={classNames}>
        <h3>
          /r/{subreddit}
          {allRead
            ? <button onClick={this.toggleForceShow}>Toggle</button>
            : <button onClick={this.markAllAsRead}>Read</button>}
        </h3>
        {!allRead || forceShow ? (
          <ul className={th.PostsList}>
            {posts.map((post) => (
              <PostsListItem
                key={post.id}
                post={post}
                isRead={!!~markedAsRead.indexOf(post.id)}
                onSelect={onOpenPost}/>
            ))}
          </ul>
        ) : null}
      </li>
    )
  }
}
