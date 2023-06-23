import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import Logo from '../Images/Logo'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: null,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onEnterUserName = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-image-bg-container">{}</div>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <Logo altText="login website logo" />
            <div className="login-input-div-container">
              <div className="login-input-container">
                <label htmlFor="userInput" className="label-element">
                  Username*
                </label>
                <input
                  id="userInput"
                  type="text"
                  className="login-input-element"
                  placeholder="username"
                  onChange={this.onEnterUserName}
                  value={username}
                />
              </div>
              <div className="login-input-container">
                <label htmlFor="passwordInput" className="label-element">
                  Password*
                </label>
                <input
                  id="passwordInput"
                  type="password"
                  className="login-input-element"
                  placeholder="password"
                  onChange={this.onEnterPassword}
                  value={password}
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="login-error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
