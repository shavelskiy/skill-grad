import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { FETCH_ALL_LOCATIONS } from '../../utils/endpoints'

import { useDispatch, useSelector } from 'react-redux'
import { setLocations } from '../../redux/data/actions'

import css from './locaton-popup.scss?module'
import cn from 'classnames'


const LocatoinPopup = ({active, close, userSelectedLocations, selectLocations}) => {
  const dispatch = useDispatch()

  const locations = useSelector(state => state.data.locations)
  const [selectedLocations, setSelectedLocations] = useState([])

  useEffect(() => {
    axios.get(FETCH_ALL_LOCATIONS)
      .then(({data}) => dispatch(setLocations(data)))
  }, [])

  useEffect(() => {
    if (typeof userSelectedLocations === 'undefined') {
      return
    }
    setSelectedLocations(userSelectedLocations)
  }, [userSelectedLocations])

  const handleClickRegion = (region) => {
    if (selectedLocations.indexOf(region.id) === -1) {
      let newLocationIds = [region.id]

      region.subregions.forEach(city => {
        newLocationIds = (selectedLocations.indexOf(city.id) === -1) ? [...newLocationIds, city.id] : newLocationIds
      })

      setSelectedLocations([...selectedLocations, ...newLocationIds])
    } else {
      setSelectedLocations(
        selectedLocations.filter(
          locationId => (locationId !== region.id) && region.subregions.filter(subregion => subregion.id === locationId).length < 1)
      )
    }
  }

  const getAllLocationIds = () => {
    let result = []

    locations.forEach(item => {
      if (item.type === 'region') {
        result = [...result, item.id]

        item.subregions.forEach(city => {
          result = [...result, city.id]
        })
      }
    })

    return result
  }

  const handleClickAllCity = () => {
    if (getAllLocationIds().length === selectedLocations.length) {
      setSelectedLocations([])
    } else {
      setSelectedLocations(getAllLocationIds())
    }
  }

  const handleClickCity = (city, region = null) => {
    if (selectedLocations.indexOf(city.id) === -1) {
      const needSelectRegion = region && region.subregions.filter(
        subregion => ((city.id === subregion.id) || (selectedLocations.indexOf(subregion.id) !== -1))
      ).length === region.subregions.length

      setSelectedLocations(needSelectRegion ? [...selectedLocations, city.id, region.id] : [...selectedLocations, city.id])
    } else {
      setSelectedLocations(selectedLocations.filter(id => id !== city.id && (region === null || id !== region.id)))
    }
  }

  const renderCityList = () => {
    return locations
      .filter(item => item.type === 'city')
      .map((city, key) => {
        return (
          <div key={key} className={cn(css.listItem, css.city)}>
            <div onClick={() => handleClickCity(city)} className={css.regionTitle}>
              <div className={cn(css.point, {[css.checked]: selectedLocations.indexOf(city.id) !== -1})}></div>
              {city.name}
            </div>
          </div>
        )
      })
  }

  const renderRegionList = () => {
    return locations
      .filter(item => item.type === 'region')
      .map((region, key) => {
        return (
          <div key={key} className={css.listItem}>
            <div onClick={() => handleClickRegion(region)} className={css.regionTitle}>
              <div className={cn(css.point, {[css.checked]: selectedLocations.indexOf(region.id) !== -1})}></div>
              {region.name}
            </div>
            <div className={css.submenuContainer}>
              <div className={css.submenuContent}>
                {renderSubmenu(region.subregions, region)}
              </div>
              <div
                className={css.saveButton}
                onClick={handleSubmit}
              >
                Сохранить
              </div>
            </div>
          </div>
        )
      })
  }

  const renderSubmenu = (items, region) => {
    return items.map((item, key) => {
      return (
        <div
          key={key}
          className={css.submenuItem}
          onClick={() => handleClickCity(item, region)}
        >
          <div
            className={cn(css.point, {[css.checked]: selectedLocations.indexOf(item.id) !== -1})}>
          </div>
          {item.name}
        </div>
      )
    })
  }

  const handleSubmit = () => {
    selectLocations(selectedLocations)
    close()
  }

  return (
    <div className={cn(css.container, {[css.active]: active})}>
      <div className={css.modal}>
        <div className={css.body}>
          <div className={css.list}>
            <div className={cn(css.listItem, css.city)}>
              <div onClick={() => handleClickAllCity()} className={css.regionTitle}>
                <div
                  className={cn(
                    css.point,
                    {[css.checked]: getAllLocationIds().length === selectedLocations.length},
                  )}
                ></div>
                Вся Россия
              </div>
            </div>
            {renderCityList()}
            {renderRegionList()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocatoinPopup
