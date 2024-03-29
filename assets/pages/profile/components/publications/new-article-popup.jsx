import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import { ARTICLES_CATEGORIES_URL, ARTICLE_SAVE_URL } from '@/utils/profile/endpoints'

import Modal from '../modal/modal'
import { Input, Textarea } from '@/components/react-ui/input'
import { Button } from '@/components/react-ui/buttons'
import Select from '@/components/react-ui/select'
import ReactQuill from 'react-quill';

import { validateFile } from '@/helpers/file-upload'

import './scss/wysiwig.scss'
import css from './scss/new-article-popup.scss?module'

import noPhoto from '@/img/interface.png'

const emptyArticle = {
  title: '',
  image: null,
  category: null,
  previewText: '',
  detailText: '',
}

const NewArticlePopup = ({active, close, onSuccess}) => {
  const ref = useRef()

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])

  const [newArticle, setNewArticle] = useState(emptyArticle)

  useEffect(() => {
    axios.get(ARTICLES_CATEGORIES_URL)
      .then(({data}) => setCategories(data))
  }, [])

  const save = () => {
    setError('')

    if (newArticle.title.length < 1) {
      setError('Введите название статьи')
      return
    }

    if (newArticle.image === null) {
      setError('Загрузите изображение')
      return
    }

    if (newArticle.category === null) {
      setError('Выберите категорию')
      return
    }

    if (newArticle.previewText.length < 1) {
      setError('Вы не ввели вступительный тест')
      return
    }

    if (newArticle.detailText.length < 1) {
      setError('Вы не ввели текст статьи')
      return
    }

    let formData = new FormData()
    formData.append('image', newArticle.image)
    formData.append('json_content', JSON.stringify({
      title: newArticle.title,
      category: newArticle.category,
      previewText: newArticle.previewText,
      detailText: newArticle.detailText,
    }))

    setDisabled(true)
    axios.post(ARTICLE_SAVE_URL, formData)
      .then(() => {
        setNewArticle(emptyArticle)
        close()
        onSuccess()
      })
      .catch(({response}) => setError(response.data.error))
      .finally(() => setDisabled(false))
  }

  const handleImageUpdate = (event) => {
    const file = event.target.files[0]

    if (!validateFile(file)) {
      return
    }

    setNewArticle({...newArticle, image: file})
  }

  return (
    <Modal
      active={active}
      close={close}
      title={'Добавить статью'}
      error={error}
      wide={true}
    >
      <Input
        type={'text'}
        placeholder={'Название статьи'}
        value={newArticle.title}
        setValue={(value) => setNewArticle({...newArticle, title: value})}
      />

      <div className={css.imageBlock}>
        <div className={css.imageContainer}>
          <input
            ref={ref}
            id={'article-image'}
            type={'file'}
            onChange={(event) => handleImageUpdate(event)}
          />
          <label htmlFor={'article-image'}>
            <img src={newArticle.image !== null ? URL.createObjectURL(newArticle.image) : noPhoto} alt=""/>
            <span>{newArticle.image === null ? 'Загрузить изображение' : ''}</span>
          </label>
        </div>
        <div className={css.selectContainer}>
          <Select
            placeholder={'Выбрать категорию'}
            value={newArticle.category}
            options={categories}
            setValue={(category) => setNewArticle({...newArticle, category: category})}
          />
        </div>
      </div>

      <Textarea
        placeholder={'Вступительный текст'}
        rows={5}
        value={newArticle.previewText}
        setValue={(value) => setNewArticle({...newArticle, previewText: value})}
      />

      <div className={css.detailText}>
        <ReactQuill
          placeholder={'Текст статьи'}
          theme="snow"
          value={newArticle.detailText}
          onChange={(value) => setNewArticle({...newArticle, detailText: value})}
        />
      </div>

      <div className={css.buttons}>
        <Button
          red={true}
          fullWidth={false}
          text={'Отменить'}
          click={close}
        />
        <Button
          blue={true}
          fullWidth={false}
          disabled={disabled}
          text={'Опубликовать'}
          click={save}
        />
      </div>
    </Modal>
  )
}

export default NewArticlePopup
