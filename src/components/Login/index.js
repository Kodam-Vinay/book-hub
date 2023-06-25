import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: null,
    checked: false,
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

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
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
    const checkPassword = password !== ''
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-image-bg-container">{}</div>
        <div className="website-login-image-container">
          <img
            src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687519360/book%20hub/Rectangle_1467_kljzqk.png"
            alt="website login"
            className="Website-login-image"
          />
        </div>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <img
              src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687670798/book%20hub/Group_7732_qntgjj.png"
              alt="login website logo"
              className="website-login-logo"
            />
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
                  type={checkPassword ? 'text' : 'password'}
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
