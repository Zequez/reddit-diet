import './index.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

render(App)

function render(App) {
  ReactDOM.render(
    <App />,
    document.getElementById('main')
  )
}

if (module.hot) {
  module.hot.accept()
}
