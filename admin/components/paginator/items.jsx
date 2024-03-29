import React from 'react'

import css from './items.scss?module'
import cn from 'classnames'


export const Item = ({active, page, click}) => {
  return (
    <li
      className={cn(css.link, {[css.active]: active})}
      onClick={() => click(page)}
    >
      <span>{page}</span>
    </li>
  )
}

export const EmptyItem = () => {
  return (
    <li className={css.link}>
      <span>...</span>
    </li>
  )
}

export const Arrow = ({left, click, active, page}) => {
  const onClick = () => {
    if (!active) {
      return
    }

    click(page)
  }

  return (
    <li
      className={cn(css.link, {[css.disabled]: !active})}
      onClick={() => onClick()}
    >
      <span>{ (left) ? (<>&laquo;</>) : (<>&raquo;</>)}</span>
    </li>
  )
}
