import React, { useEffect, useRef, useState } from 'react'

import css from './select.scss?module'
import cn from 'classnames'

import arrow from './../../images/select-arrow.svg'


const Select = ({options, value, setValue, canUncheck = false, small = false, medium = false, large = false, high = false, low = false}) => {
  const ref = useRef()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      setOpened(false)
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, setOpened])

  const selectValue = (item) => {
    if (value !== null && value === item.value) {
      if (!canUncheck) {
        return
      }
      setValue(null)
    } else {
      setValue(item.value)
    }

    setOpened(false)
  }

  const getTitle = () => {
    const selectedItems = options.filter((item) => {
      return item.value === value
    })

    return selectedItems.length > 0 ? selectedItems[0].title : ''
  }

  return (
    <div ref={ref} className={
      cn(
        css.select,
        {[css.opened]: opened},
        {[css.small]: small},
        {[css.medium]: medium},
        {[css.large]: large},
        {[css.high]: high},
        {[css.low]: low},
      )}
    >
      <div className={css.selectedOption} onClick={() => setOpened(!opened)}>
        <span> {getTitle()}</span>
        <img src={arrow} className={css.icon}/>
      </div>
      <div className={css.optionContainer}>
        <ul>
          {
            options.map((item, key) => {
              return (
                <li
                  key={key}
                  className={cn({[css.active]: (item.value === value)})}
                  onClick={() => selectValue(item)}>
                  {item.title}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Select
