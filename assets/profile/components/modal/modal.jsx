import React, {useEffect, useRef} from 'react'

import cn from 'classnames'
import css from './modal.scss?module'


const Modal = ({children, width = false, active, title, close}) => {
  const ref = useRef()

  useEffect(() => {
    const listener = event => {
      console.log(event.target)
      if (!ref.current || ref.current !== event.target) {
        return
      }

      close()
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, close])

  return (
    <div ref={ref} className={cn(css.modal, {[css.active]: active})}>
      <div className={cn(css.modalContent, {[css.width]: width})}>
        <span className={css.close} onClick={close}>&times;</span>
        <div className={css.content}>
          <h4>{title}</h4>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
