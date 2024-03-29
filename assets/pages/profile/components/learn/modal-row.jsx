import React from 'react'

import cn from 'classnames'
import css from './scss/modal-row.scss?module'


const valueDescriptionMap = [
  'Выберите уровень',
  'Совсем нет',
  'В малой степени',
  'В средней степени',
  'В значительной степени',
  'В полной степени',
]

const ModalRow = ({number, description, value, setValue}) => {
  const renderValues = () => {
    const items = []

    for (let i = 1; i <= 5; i++) {
      items.push(
        <span
          key={i}
          className={cn({[css.fill]: i <= value})}
          onClick={() => setValue(i !== value ? i : 0)}
        ></span>
      )
    }

    return items
  }

  return (
    <div className={css.item}>
      <p className={css.text}>
        {number}) {description} <span className={css.red}>*</span>
      </p>
      <div className={css.blockLevel}>
        <div className={css.level}>
          {renderValues()}
        </div>
        <p className={cn(css.textSmall, {[css.accent]: value !== 0})}>
          {valueDescriptionMap[value]}
        </p>
      </div>
    </div>
  )
}

export default ModalRow
