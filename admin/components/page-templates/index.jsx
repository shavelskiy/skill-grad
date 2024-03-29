import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setBreacrumbs, setTitle } from '../../redux/actions'

import axios from 'axios'

import Table from '../../components/table/table'
import Paginator from '../../components/paginator/paginator'
import Portlet from '../portlet/portlet'
import Button from '../ui/button'
import PageCountSelect, { DEFAULT_PAGE_ITEMS } from './page-count-select'

import querystring from 'querystring'
import { getInitStateFromUrl } from './helpers'

import css from './index.scss?module'


const IndexPageTemplate = ({title, icon, table, actions, fetchUrl, canCreate, createLink}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const initState = getInitStateFromUrl(location.search.substr(1))

  const [body, setBody] = useState([])
  const [paginatorRequest, setPaginatorRequest] = useState(null)
  const [disabledTable, setDisabledTable] = useState(false)

  const [totalPages, setTotalPages] = useState(0)

  const [query, setQuery] = useState({
    pageItemCount: initState.pageItemCount,
    currentPage: initState.page,
    order: initState.order,
    search: initState.search
  })

  const [reloadTable, setReloadTable] = useState(true)

  useEffect(() => {
    dispatch(setTitle(title))
    dispatch(setBreacrumbs([]))
  }, [])

  useEffect(() => {
    let mounted = true
    const loadItems = async () => {
      const axiosSource = axios.CancelToken.source()

      if (paginatorRequest) {
        paginatorRequest.cancel()
      }

      setPaginatorRequest({cancel: axiosSource.cancel})
      setDisabledTable(true)

      const params = {}

      if (query.currentPage !== 1) {
        params.page = query.currentPage
      }

      if (JSON.stringify(query.order) !== JSON.stringify({})) {
        params.order = JSON.stringify(query.order)
      }

      if (JSON.stringify(query.search) !== JSON.stringify({})) {
        params.search = JSON.stringify(query.search)
      }

      if (query.pageItemCount !== DEFAULT_PAGE_ITEMS) {
        params.pageItemCount = query.pageItemCount
      }

      history.push({
        pathname: history.pathname,
        search: `?${querystring.stringify(params)}`
      })

      axios.get(fetchUrl, {
        cancelToken: axiosSource.token,
        params: params,
      })
        .then(({data}) => {
          if (!mounted) {
            return
          }

          setBody(data.items)
          setTotalPages(data.total_pages)
          setDisabledTable(false)
        })
    }
    loadItems()

    return () => mounted = false
  }, [query, reloadTable])

  const clearSearch = () => {
    if (JSON.stringify(query.search) === JSON.stringify({})) {
      return
    }

    setQuery({...query, search: {}, order: {}})
  }

  return (
    <Portlet
      title={title}
      titleIcon={icon}
      withButton={canCreate}
      buttonLink={createLink}
    >
      <div className={css.settingsWrap}>
        <PageCountSelect
          value={query.pageItemCount}
          setValue={(pageItemCount) => {
            setQuery({...query, pageItemCount: pageItemCount, currentPage: 1})
          }}
        />
        <Button
          text="очистить поиск"
          primary={true}
          click={() => clearSearch()}
        />
      </div>
      <Table
        table={table}
        disabled={disabledTable}
        body={body}
        query={query}
        actions={actions}
        reload={() => setReloadTable(!reloadTable)}
        changeSearch={(search) => setQuery({...query, search: search, currentPage: 1})}
        changeOrder={(order) => setQuery({...query, order: order})}
      />
      <Paginator
        totalPages={totalPages}
        currentPage={query.currentPage}
        click={(page) => {
          (page !== query.currentPage) ? setQuery({...query, currentPage: page}) : {}
        }}
      />
    </Portlet>
  )
}

export default IndexPageTemplate
