import React from 'react'

import { ADDITIONAL_INFO } from '../../utils/titles'

import { useSelector, useDispatch } from 'react-redux'
import { setAdditionalInfo } from '../../redux/program/actions'

import Block from '../ui/block'
import { Textarea } from '../ui/input'

import css from './additional-info.scss?module'


const AdditionalInfo = () => {
  const dispatch = useDispatch()

  return (
    <Block title={ADDITIONAL_INFO}>
      <div className={css.inputContainer}>
        <Textarea
          placeholder={'Дополнительная информация'}
          value={useSelector(state => state.program.additionalInfo)}
          setValue={(value) => dispatch(setAdditionalInfo(value))}
          extraLarge={true}
        />
      </div>
    </Block>
  )
}

export default AdditionalInfo
