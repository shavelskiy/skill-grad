import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PROVIDER_INDEX } from '../../utils/routes'

import axios from 'axios'
import { CREATE_PROVIDER_URL } from '../../utils/api/endpoints'

import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setBreacrumbs, showAlert, showLoader } from '../../redux/actions'

import ProviderForm from './form'
import Portlet from '../../components/portlet/portlet'
import ProviderRequisitesForm from './requisites-form'


const ProviderCreate = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const title = useSelector(state => state.title)

  const [item, setItem] = useState({
    name: '',
    description: '',
    mainCategories: [],
    categories: [],
    locations: [],
    organizationName: '',
    legalAddress: '',
    mailingAddress: '',
    ITN: '',
    IEC: '',
    PSRN: '',
    OKPO: '',
    checkingAccount: '',
    correspondentAccount: '',
    BIC: '',
    bank: '',
  })

  const [disableButton, setDisableButton] = useState(false)
  const [uploadImage, setUploadImage] = useState(null)

  useEffect(() => {
    dispatch(showLoader())
    dispatch(setTitle('Добавление провайдера обучения'))
    dispatch(setBreacrumbs([
      {
        title: 'Список провайдеров',
        link: PROVIDER_INDEX,
      }
    ]))
  }, [])

  const save = () => {
    setDisableButton(true)

    const formData = new FormData()
    formData.append('uploadImage', uploadImage)
    formData.append('json_content', JSON.stringify(item))

    axios.post(CREATE_PROVIDER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => history.push(PROVIDER_INDEX))
      .catch((error) => {
        dispatch(showAlert(error.response.data.message))
        setDisableButton(false)
      })
  }

  return (
    <>
      <Portlet
        width={50}
        title={title}
        titleIcon={'info'}
      >
        <ProviderForm
          item={item}
          setItem={setItem}
          uploadImage={uploadImage}
          setUploadImage={setUploadImage}
          save={save}
          disable={disableButton}
        />
      </Portlet>
      <Portlet
        width={50}
        title="Реквизиты организации"
        titleIcon={'info'}
      >
        <ProviderRequisitesForm
          item={item}
          setItem={setItem}
        />
      </Portlet>
    </>
  )
}

export default ProviderCreate
