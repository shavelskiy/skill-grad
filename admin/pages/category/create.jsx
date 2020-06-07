import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CATEGORY_INDEX } from '../../utils/routes'

import axios from 'axios'
import { CREATE_CATEGORY_URL, FETCH_CATEGORY_URL } from '../../utils/api/endpoints'

import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setBreacrumbs, showLoader, hideLoader, showAlert } from '../../redux/actions'

import CategoryForm from './form'
import Portlet from '../../components/portlet/portlet'


const CategoryCreate = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [parentCategory, setParentCategory] = useState(null)

  useEffect(() => {
    dispatch(setTitle('Создание категории'))
    dispatch(setBreacrumbs([
      {
        title: 'Список категорий',
        link: CATEGORY_INDEX,
      }
    ]))

    if (typeof match.params.id !== 'undefined') {
      dispatch(showLoader())

      axios.get(FETCH_CATEGORY_URL.replace(':id', match.params.id))
        .then(({data}) => {
          setParentCategory(data)
          dispatch(hideLoader())
        })
    }
  }, [])

  const title = useSelector(state => state.title)

  const [item, setItem] = useState({
    name: '',
    slug: '',
    sort: 0,
  })

  const [disableButton, setDisableButton] = useState(false)

  const save = () => {
    setDisableButton(true)

    axios.post(CREATE_CATEGORY_URL.replace(':id', (parentCategory !== null) ? parentCategory.id : ''), item)
      .then(() => history.push(CATEGORY_INDEX))
      .catch((error) => {
        dispatch(showAlert(error.response.data.message))
        setDisableButton(false)
      })
  }

  return (
    <Portlet
      width={50}
      title={title}
      titleIcon={'info'}
      withButton={false}
    >
      <CategoryForm
        item={item}
        setItem={setItem}
        save={save}
        disable={disableButton}
        parentCategory={parentCategory}
      />
    </Portlet>
  )
}

export default CategoryCreate
