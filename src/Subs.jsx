import React, { Component } from 'react'

type Props = {
  subreddits: String[]
}

export default class Subs extends Component {
  props : Props

  render () {
    let { subreddits } = this.props

    return (
      <div className='Subs'>
        <ul className='SubsList'>
          {subreddits.map((sub) => (
            <li>
              <h3>/r/{sub}</h3>
              <ul className='Posts'>
                
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
