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
  mode: 'hot' | 'day' | 'week' | 'month',
  readPostsMode: Boolean
}

function parseSub (sub) {
  let data = {
    subreddit: null,
    limit: null,
    mode: null
  }
  let advancedSub = sub.split(/\s+/)
  data.subreddit = advancedSub.shift()
  advancedSub = advancedSub.join(' ')
  if (advancedSub) {
    let modeMatch = advancedSub.match(/hot|day|week|month|year|all/)
    let limitMatch = advancedSub.match(/[0-9]+/)
    if (modeMatch) data.mode = modeMatch[0]
    if (limitMatch) data.limit = parseInt(limitMatch[0])
  }

  return data
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
    if (props.mode !== this.props.mode || props.limit !== this.props.limit) {
      this.fetchPosts(props)
    }
    if (props.markedAsRead !== this.props.markedAsRead) {
      let isAllRead = this.isAllRead(this.state.posts, props.markedAsRead)
      this.setState({forceShow: !isAllRead})
    }
  }

  fetchPosts (props = this.props) {
    let { limit, mode, subreddit } = props
    let url = ['https://www.reddit.com/r/']

    let advancedSub = parseSub(subreddit)
    subreddit = advancedSub.subreddit
    limit = advancedSub.limit || limit
    mode = advancedSub.mode || mode

    let isTopMode = !!~['day', 'week', 'month', 'year', 'all'].indexOf(mode)

    url.push(subreddit)
    if (isTopMode) url.push('/top')
    url.push('.json')
    url.push(`?limit=${limit}`)
    if (isTopMode) url.push(`&sort=top&t=${mode}`)

    fetch(url.join(''))
      .then((data) => data.json())
      .then((data) => {
        let posts = data.data.children.map((p) => p.data)
        this.setState({
          posts,
          forceShow: !this.isAllRead(posts)
        })
      })
  }

  isAllRead (posts = this.state.posts, markedAsRead = this.props.markedAsRead) {
    return posts.every((p) => ~markedAsRead.indexOf(p.id))
  }

  markAllAsRead = (ev) => {
    let ids = this.state.posts.map((p) => p.id)
    this.props.onMarkAsRead(ids)
    this.setState({forceShow: false})
    ev.stopPropagation()
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

    let advancedSub = parseSub(subreddit)

    return (
      <li className={classNames}>
        <h3 onClick={this.toggleForceShow}>
          <span className={th.__titleIcon}>
            {allRead ? (forceShow ? '-' : '+') : '○'}
          </span>
          /r/{advancedSub.subreddit}
          &nbsp;
          <span className={th.__titleSubRefine}>
            {advancedSub.mode ?
              (advancedSub.mode[0].toUpperCase() + advancedSub.mode.toLowerCase().slice(1))
            : null}
            {advancedSub.limit ? (' #' + advancedSub.limit) : null}
          </span>
          {!allRead ? (
            <button onClick={this.markAllAsRead}>Mark All As Read</button>
          ) : null}
        </h3>
        {forceShow ? (
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
