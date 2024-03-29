import {
  HIDE_LOADER,
  SHOW_LOADER,
  SET_TITLE,
  SET_BREADCRUMBS,
  SET_CURRENT_USER,
  SET_REDIRECT_LINK,
  SHOW_ALERT
} from './types'

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function setTitle(title) {
  return {
    type: SET_TITLE,
    payload: title
  }
}

export function setBreacrumbs(breadcrumbs, withRoot = true) {
  return {
    type: SET_BREADCRUMBS,
    payload: {
      items: breadcrumbs,
      withRoot: withRoot
    }
  }
}

export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  }
}

export function setRedirectLink(redirectLink) {
  return {
    type: SET_REDIRECT_LINK,
    payload: redirectLink,
  }
}

export function showAlert(message) {
  return {
    type: SHOW_ALERT,
    payload: message,
  }
}
