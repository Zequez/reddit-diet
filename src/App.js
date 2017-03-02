import React, { Component } from 'react'
import './App.sass'
import Subs from './Subs'

const subreddits = ['webdev', 'javascript', 'argentina', 'technology', 'oculus']

export default class App extends Component {
  render () {

    return (
      <div className='App'>
        <div className='Header'>
          Reddit Diet
        </div>
        <Subs subreddits={subreddits}/>
        <div className='PostFrame'>
          <iframe></iframe>
        </div>
      </div>
    );
  }
}
