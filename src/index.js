import './index.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(
  <App />,
  document.getElementById('main')
)


if (module.hot) {
  module.hot.accept('./components/App.jsx', function() {
    console.log('Accepting the updated printMe module!')
  })
}
