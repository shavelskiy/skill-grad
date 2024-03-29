import React, { useState, useEffect } from 'react'
import { ARTICLE_INDEX } from '../../utils/routes'

import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setBreacrumbs } from '../../redux/actions'

import Portlet from '../../components/portlet/portlet'
import ViewPageTemplate from '../../components/page-templates/view'
import { FETCH_ARTICLE_URL } from '../../utils/api/endpoints'


const ArticleView = ({match}) => {
  const dispatch = useDispatch()

  const title = useSelector(state => state.title)

  const [item, setItem] = useState({
    id: match.params.id,
    name: '',
    sort: 0,
    active: false,
    detailText: '',
    image: null,
    showOnMain: false,
    createdAt: '',
  })

  useEffect(() => {
    dispatch(setBreacrumbs([
      {
        title: 'Список статей',
        link: ARTICLE_INDEX,
      }
    ]))
  }, [])

  useEffect(() => {
    dispatch(setTitle(`Просмотр статьи "${item.name}"`))
  }, [item])

  const setItemFromResponse = (data) => {
    setItem({
      id: data.id,
      name: data.name,
      sort: data.sort,
      active: data.active,
      detailText: data.detail_text,
      image: data.image,
      showOnMain: data.showOnMain,
      createdAt: data.created_at,
    })
  }

  return (
    <ViewPageTemplate
      key={item.id}
      fetchUrl={FETCH_ARTICLE_URL.replace(':id', item.id)}
      setItem={setItemFromResponse}
    >
      <Portlet
        width={50}
        title={title}
        titleIcon={'eye'}
      >
        <table>
          <tbody>
          <tr>
            <td>ID</td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>Название</td>
            <td>{item.name}</td>
          </tr>
          <tr>
            <td>Сортировка</td>
            <td>{item.sort}</td>
          </tr>
          <tr>
            <td>Активность</td>
            <td>{item.active ? 'Да' : 'Нет'}</td>
          </tr>
          <tr>
            <td>Изображение</td>
            <td><img src={item.image}/></td>
          </tr>
          <tr>
            <td>Показывать на главной</td>
            <td>{item.showOnMain ? 'Да' : 'Нет'}</td>
          </tr>
          <tr>
            <td>Дата создания</td>
            <td>{item.createdAt}</td>
          </tr>
          </tbody>
        </table>
      </Portlet>
      <Portlet
        width={50}
        title={'Детальное описание'}
        titleIcon={'eye'}
      >
        <div dangerouslySetInnerHTML={{__html: item.detailText}}></div>
      </Portlet>
    </ViewPageTemplate>
  )
}

export default ArticleView
