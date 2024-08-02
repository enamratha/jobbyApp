import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    console.log(props)
    history.replace('/login')
  }
  return (
    <nav className="header">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="nav-items-container">
        <div className="nav-links">
          <Link to="/" className="nav-item-md">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-item-md">
            <li>Jobs</li>
          </Link>
        </div>
        <li>
          <button className="log-out-btn" onClick={onLogOut} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
