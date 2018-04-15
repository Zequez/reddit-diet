import React from 'react'
import t from 'prop-types'
import cx from 'classnames'
import th from './HotSelect.sass'

export default class HotSelect extends React.Component {
  propTypes: {
    label: t.string,
    options: t.object,
    selected: t.string,
    onChange: t.func
  }

  render () {
    let { label, options, selected, onChange } = this.props

    return (
      <div className={th.HotSelect}>
        <div className={th.__label}>{label}</div>
        <div className={th.__options}>
          {Object.keys(options).map((m) =>
            <button
              key={m}
              className={cx(th.__option, {[th.__option_active]: m === selected})}
              onClick={() => onChange(m)}>
              {options[m]}
            </button>
          )}
        </div>
      </div>
    )
  }
}
