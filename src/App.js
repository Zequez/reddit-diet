import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='Header'>
          Reddit Diet
        </div>
        <div className='Subs'>
          <ul className='SubsList'>
            <li>
              <h3>/r/webdev</h3>
              <ul className='Posts'>

              </ul>
            </li>
          </ul>
        </div>
        <div className='PostFrame'>
          <iframe></iframe>
        </div>
      </div>
    );
  }
}
