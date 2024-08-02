import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameComponent = () => {
    const {username} = this.state
    return (
      <div className="input-component">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          id="username"
          type="text"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordComponent = () => {
    const {password} = this.state
    return (
      <div className="input-component">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const stringifiedUserDetails = JSON.stringify(userDetails)

    const options = {
      method: 'POST',
      body: stringifiedUserDetails,
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginForm = () => {
    const {showErrorMsg, errorMsg} = this.state

    return (
      <form onSubmit={this.onSubmitForm}>
        <div>
          <div className="login-heading">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          {this.renderUsernameComponent()}
          {this.renderPasswordComponent()}
          <button type="submit">Login</button>
          {showErrorMsg && <p>*{errorMsg}</p>}
        </div>
      </form>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="main-container">{this.renderLoginForm()}</div>
      </div>
    )
  }
}

export default Login
