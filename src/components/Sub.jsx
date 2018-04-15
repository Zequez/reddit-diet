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
  mode: 'hot' | 'top_day' | 'top_week' | 'top_month',
  readPostsMode: Boolean
}

export default class Sub extends React.Component {
  props: Props

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

  clickTitle = () => {
    this.isAllRead() ? this.toggleForceShow() : this.markAllAsRead()
  }

  render () {
    let { subreddit } = this.props
    let { posts, forceShow } = this.state

    let allRead = this.isAllRead()

    let classNames = cx(th.Sub, {
      [th.__allRead]: allRead
    })

    return (
      <li className={classNames}>
        <h3 onClick={this.clickTitle}>
          <span className={th.__titleIcon}>
            {allRead ? (forceShow ? '-' : '+') : '◉'}
          </span>
          /r/{subreddit}
        </h3>
        {!allRead || forceShow ? (
          <ul className={th.PostsList}>
            {posts.map((post) => this.renderPost(post))}
          </ul>
        ) : null}
      </li>
    )
  }

  renderPost = (post) => {
    let isRead = !!~this.props.markedAsRead.indexOf(post.id)
    let readPostsMode = this.props.readPostsMode

    return (isRead && !readPostsMode) ? null : (
      <PostsListItem
        key={post.id}
        post={post}
        isRead={isRead}
        onSelect={this.props.onOpenPost}/>
    )
  }
}
