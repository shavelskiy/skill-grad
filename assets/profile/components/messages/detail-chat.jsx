import React, {useState, useEffect, useRef} from 'react'

import DetailChatItem from './detail-chat-item'

import css from './detail-chat.scss?module'
import cn from 'classnames'


const DetailChat = ({messages, user, recipient, setWriting, writing, sendMessage}) => {
  const ref = useRef()

  const [messageText, setMessageText] = useState('')

  const handleKeyPress = (event) => {
    if (event.which !== 13) {
      return
    }

    if (!event.shiftKey) {
      event.preventDefault()
      sendMessage(messageText)
      setMessageText('')
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scroll(0, ref.current.offsetHeight + 999999)
    }
  }, [messages, ref])

  if (user === null || recipient === null) {
    return (
      <div className={cn(css.content, css.empty)}>
        <h6>Выберите собеседника...</h6>
      </div>
    )
  }

  return (
    <div className={css.content}>
      <div className={css.headerContent}>
        <i className={css.iconLeft}></i>
        <div className={css.avatar}>
          <img className="rounded" src="../../../img/photo.jpg" alt=""/>
        </div>
        <div className={css.info}>
          Автор беседы: <a href="#">{recipient.name}</a>
        </div>
        {writing ? <span className={css.writing}>Печатает...</span> : <></>}
      </div>
      <div className={css.box} ref={ref}>
        {messages.map((item, key) => <DetailChatItem key={key} message={item} user={user} recipient={recipient}/>)}
      </div>
      <div className={css.textareaBox}>
        <textarea
          rows="10"
          className={cn(css.textarea, 'textarea')}
          placeholder="Текст сообщения"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setWriting(true)}
          onBlur={() => setWriting(false)}
        ></textarea>
      </div>
    </div>
  )
}

export default DetailChat