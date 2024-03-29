import React from 'react'

import { TERM_OF_USE } from '@/utils/program-form/titles'

import { useDispatch, useSelector } from 'react-redux'
import { setActions, setShowPriceReduction } from '../../redux/program/actions'
import { focusTermOfUse } from './../../redux/validation/actions'

import Block from '@/components/react-ui/program-form/block'
import EnumList from '@/components/react-ui/program-form/enum-list'
import Price from './price'
import Discounts from './discounts'
import FavoriteProvider from './favorite-provider'
import TermOfPayment from './term-of-payment'

import css from './term-of-use.scss?module'
import cn from 'classnames'
import { validatePrice } from '@/helpers/validate-program-form';


const TermOfUse = () => {
  const dispatch = useDispatch()

  const blockActive = useSelector((state) => state.validation.termOfUse.active)
  const program = useSelector(state => state.program)

  const showPriceReduction = useSelector(state => state.program.showPriceReduction)

  return (
    <Block title={TERM_OF_USE} containerClass={css.container} onFocus={focusTermOfUse}>
      <div>
        <Price error={blockActive && !validatePrice(program)}/>
      </div>

      <div className={css.smallMargin}>
        <h3>Показывать снижение цены</h3>
        <div className={css.switcherContainer} onClick={() => dispatch(setShowPriceReduction(!showPriceReduction))}>
          <span className={cn(css.switcher, {[css.selected]: showPriceReduction})}></span>
        </div>
        <span className={css.description}>
          Если вводится новая, более низкая цена, то: новая показана красным цветом, а старая чёрным и перечеркнута
        </span>
      </div>

      <div className={css.inputContainer}>
        <Discounts/>
      </div>

      <div className={css.smallMargin}>
        <EnumList
          title={'Акции от провайдера'}
          values={useSelector(state => state.program.actions)}
          setValues={(values) => dispatch(setActions(values))}
          wide={true}
        />
      </div>

      <div className={css.inputContainer}>
        <FavoriteProvider/>
      </div>

      <div className={css.inputContainer}>
        <TermOfPayment/>
      </div>

    </Block>
  )
}

export default TermOfUse
