import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

import HamburgerContext from '../../Context/HamburgerContext'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <HamburgerContext.Consumer>
      {value => {
        const {changeStateHamburger} = value
        const onClickHamburger = () => {
          changeStateHamburger(true)
        }
        return (
          <div className="header-bg-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687670798/book%20hub/logo.png"
                alt="website logo"
                className="website-login-logo"
              />
            </Link>
            <div className="nav-links-sm-container">
              <button
                type="button"
                className="hamburger-button"
                onClick={onClickHamburger}
              >
                <GiHamburgerMenu size={24} />
              </button>
            </div>
            <div className="nav-links-lg-container">
              <ul className="nav-links-list">
                <Link to="/" className="nav-link">
                  <li className="nav-link-list-item">Home</li>
                </Link>
                <Link to="/shelf" className="nav-link">
                  <li className="nav-link-list-item">Bookshelves</li>
                </Link>
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          </div>
        )
      }}
    </HamburgerContext.Consumer>
  )
}
export default withRouter(Header)
