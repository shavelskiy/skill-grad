import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, setCurrentUser, setTitle } from '../../redux/actions'

import axios from 'axios'
import { LOGIN_URL } from '../../utils/api/endpoints'

import css from './login.scss'


const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector(state => state.currentUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [lock, setLock] = useState(false)

  useEffect(() => {
    if (currentUser !== null) {
      history.push('/')
    }

    dispatch(setTitle('Авторизация'))
  }, [])

  const loginAction = () => {
    setLock(true)
    setError(null)
    axios.post(LOGIN_URL, {
      email: email,
      password: password
    })
      .then(({data}) => {
        dispatch(setCurrentUser(data.current_user))
        history.goBack()
      })
      .catch(({response}) => {
        setError(response.data.message)
      })
      .finally(() => {
        setLock(false)
      })
  }

  return (
    <div className="login-page">
      <div className={`login-container ${lock ? 'lock' : ''}`}>
        <div className="title">
          <h3>Авторизация</h3>
        </div>
        <div className="form">
          <div className={`error ${(error !== null) ? 'active' : ''}`}>
            <span>{error}</span>
          </div>
          <div className="group">
            <input
              type="text"
              placeholder="Логин"
              name="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="group">
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="actions">
            <button
              onClick={() => loginAction()}
              disabled={lock}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
