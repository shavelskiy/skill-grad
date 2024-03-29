import React from 'react'
import { Link } from 'react-router-dom'

import css from './scss/request.scss?module'
import cn from 'classnames'


const Request = ({link, programId, values, name}) => {
  const renderNewCountNotification = () => {
    if (values.new === 0) {
      return <></>
    }

    return <span className={css.buttonNotification}>{values.new}</span>
  }

  return (
    <td className="col-sm-1">
      {/*<strong className="accent mobile">{name}</strong>*/}
      <Link to={link.replace(':id', programId)}>
        <div className={css.iconButton}>
          <span className={cn('icon', 'mail')}></span>
          {renderNewCountNotification()}
        </div>
      </Link>
      <p className={css.iconTotalText}>
        Всего: {values.total}
      </p>
    </td>
  )
}

export default Request
