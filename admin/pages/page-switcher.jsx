import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import css from './page-switcher.scss?module'
import cn from 'classnames'

import {
  INDEX,
  CATEGORY_INDEX,
  CATEGORY_VIEW,
  CATEGORY_UPDATE,
  TAG_CREATE,
  TAG_INDEX,
  TAG_UPDATE,
  TAG_VIEW,
  ARTICLE_INDEX,
  ARTICLE_CREATE,
  ARTICLE_VIEW,
  ARTICLE_UPDATE,
  USER_INDEX,
  LOCATION_INDEX,
  LOCATION_VIEW,
  CATEGORY_CREATE,
  PROGRAM_FORMAT_INDEX,
  PROGRAM_FORMAT_CREATE,
  PROGRAM_FORMAT_UPDATE,
  PROVIDER_INDEX,
  PROVIDER_CREATE,
  LOCATION_CREATE,
  LOCATION_UPDATE,
  PROVIDER_UPDATE,
  PROVIDER_VIEW,
  PROGRAM_ADDITIONAL_INDEX,
  PROGRAM_ADDITIONAL_CREATE,
  PROGRAM_ADDITIONAL_UPDATE,
  PROGRAM_INCLUDE_INDEX,
  PROGRAM_INCLUDE_UPDATE, PROGRAM_INCLUDE_CREATE,
} from './../utils/routes'

import Breadcrumbs from '../components/breadcrumbs/breacrumbs'
import NotFoundPage from '../pages/not-found/not-found'
import IndexPage from './'
import CategroyIndex from './category'
import CategoryView from './category/view'
import CategoryCreate from './category/create'
import CategoryUpdate from './category/update'
import ProgramFormatIndex from './program-format'
import ProgramFormatCreate from './program-format/create'
import ProgramFormatUpdate from './program-format/update'
import ProviderIndex from './provider'
import ProviderCreate from './provider/create'
import ProviderView from './provider/view'
import ProviderUpdate from './provider/update'
import TagsIndex from '../pages/tags'
import TagView from '../pages/tags/view'
import TagCreate from '../pages/tags/create'
import TagUpdate from './tags/update'
import ArticleIndex from './articles'
import ArticleCreate from './articles/create'
import ArticleView from './articles/view'
import ArticleUpdate from './articles/update'
import UsersIndex from './users'
import LocationsIndex from '../pages/locations'
import LocationCreate from './locations/create'
import LocationView from '../pages/locations/view'
import LocationUpdate from './locations/update'
import ProgramAdditionalIndex from './program-additional'
import ProgramAdditionalCreate from './program-additional/create'
import ProgramAdditionalUpdate from './program-additional/update'
import ProgramIncludeIndex from './program-include'
import ProgramIncludeUpdate from './program-include/update'
import ProgramIncludeCreate from './program-include/create'


const PageSwitcher = ({active}) => {
  const breadcrumbs = useSelector(state => state.breadcrumbs)

  return (
    <div className={cn(css.page, {[css.hidden]: !active})}>
      <Breadcrumbs items={breadcrumbs}/>

      <div className={css.content}>
        <Switch>
          <Route exact name="categroy.index" path={CATEGORY_INDEX} component={CategroyIndex}/>
          <Route exact name="categroy.create" path={CATEGORY_CREATE} component={CategoryCreate}/>
          <Route exact name="categroy.view" path={CATEGORY_VIEW} component={CategoryView}/>
          <Route exact name="categroy.update" path={CATEGORY_UPDATE} component={CategoryUpdate}/>

          <Route exact name="program-format.index" path={PROGRAM_FORMAT_INDEX} component={ProgramFormatIndex}/>
          <Route exact name="program-format.create" path={PROGRAM_FORMAT_CREATE} component={ProgramFormatCreate}/>
          <Route exact name="program-format.update" path={PROGRAM_FORMAT_UPDATE} component={ProgramFormatUpdate}/>

          <Route exact name="program-additional.index" path={PROGRAM_ADDITIONAL_INDEX} component={ProgramAdditionalIndex}/>
          <Route exact name="program-additional.create" path={PROGRAM_ADDITIONAL_CREATE} component={ProgramAdditionalCreate}/>
          <Route exact name="program-additional.update" path={PROGRAM_ADDITIONAL_UPDATE} component={ProgramAdditionalUpdate}/>

          <Route exact name="program-include.index" path={PROGRAM_INCLUDE_INDEX} component={ProgramIncludeIndex}/>
          <Route exact name="program-include.create" path={PROGRAM_INCLUDE_CREATE} component={ProgramIncludeCreate}/>
          <Route exact name="program-include.update" path={PROGRAM_INCLUDE_UPDATE} component={ProgramIncludeUpdate}/>

          <Route exact name="provider.index" path={PROVIDER_INDEX} component={ProviderIndex}/>
          <Route exact name="provider.create" path={PROVIDER_CREATE} component={ProviderCreate}/>
          <Route exact name="provider.view" path={PROVIDER_VIEW} component={ProviderView}/>
          <Route exact name="provider.update" path={PROVIDER_UPDATE} component={ProviderUpdate}/>

          <Route exact name="tag.index" path={TAG_INDEX} component={TagsIndex}/>
          <Route exact name="tag.create" path={TAG_CREATE} component={TagCreate}/>
          <Route exact name="tag.view" path={TAG_VIEW} component={TagView}/>
          <Route exact name="tag.update" path={TAG_UPDATE} component={TagUpdate}/>

          <Route exact name="article.index" path={ARTICLE_INDEX} component={ArticleIndex}/>
          <Route exact name="article.create" path={ARTICLE_CREATE} component={ArticleCreate}/>
          <Route exact name="article.view" path={ARTICLE_VIEW} component={ArticleView}/>
          <Route exact name="article.update" path={ARTICLE_UPDATE} component={ArticleUpdate}/>

          <Route exact name="user.index" path={USER_INDEX} component={UsersIndex}/>

          <Route exact name="location.index" path={LOCATION_INDEX} component={LocationsIndex}/>
          <Route exact name="location.create" path={LOCATION_CREATE} component={LocationCreate}/>
          <Route exact name="location.view" path={LOCATION_VIEW} component={LocationView}/>
          <Route exact name="location.update" path={LOCATION_UPDATE} component={LocationUpdate}/>

          <Route exact name="index" path={INDEX} component={IndexPage}/>
          <Route path="/" component={NotFoundPage}/>
        </Switch>
      </div>
    </div>
  )
}

export default PageSwitcher
