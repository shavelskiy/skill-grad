import React from 'react'
import {Route, Switch} from 'react-router-dom'

import {
  SETTINGS,
  PROGRAMS,
  PUBLICATIONS,
  MESSAGES,
  PAYMENTS,
  PROGRAM_REQUESTS,
  PROGRAM_QUESTIONS, PROGRAM_REVIEWS
} from '@/utils/profile/routes'

import ProviderMenu from './menu/provider-menu'

import ProviderSettings from './settings/provider/provider-settings'
import Programs from './programs/list/programs'
import ProgramRequests from './programs/requests/program-requests'
import ProgramQuestions from './programs/questions/program-questions'
import ProgramReviews from './programs/reviews/program-reviews'
import Publications from './publications/publications'
import Messages from './messages/messages'
import Payments from './payments/payments'

import css from './index.scss?module'


const ProviderApp = () => {
  return (
    <div className={ css.mainProfile }>
      <h2 className="title">Личный кабинет провайдера</h2>
      <ProviderMenu/>

      <Switch>
        <Route exact name="profile.settings" path={SETTINGS} component={ProviderSettings}/>
        <Route exact name="profile.programs" path={PROGRAMS} component={Programs}/>
        <Route exact name="profile.programs.requests" path={PROGRAM_REQUESTS} component={ProgramRequests}/>
        <Route exact name="profile.programs.questions" path={PROGRAM_QUESTIONS} component={ProgramQuestions}/>
        <Route exact name="profile.programs.reviews" path={PROGRAM_REVIEWS} component={ProgramReviews}/>
        <Route exact name="profile.publications" path={PUBLICATIONS} component={Publications}/>
        <Route exact name="profile.messages" path={MESSAGES} component={Messages}/>
        <Route exact name="profile.payments" path={PAYMENTS} component={Payments}/>
      </Switch>
    </div>
  )
}

export default ProviderApp
