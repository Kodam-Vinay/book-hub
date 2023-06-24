import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'
import Logo from '../Images/Logo'

const Header = props => {
  const {history, changeStateHamburger, hamburgerButtonStatus} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickHamburger = () => {
    changeStateHamburger()
  }
  return (
    <div className="header-bg-container">
      <Link to="/" className="nav-link">
        <Logo altText="website logo" />
      </Link>
      <div className="nav-links-sm-container">
        {!hamburgerButtonStatus ? (
          <button
            type="button"
            className="hamburger-button"
            onClick={onClickHamburger}
          >
            <GiHamburgerMenu size={24} />
          </button>
        ) : (
          <button
            type="button"
            className="hamburger-button"
            onClick={onClickHamburger}
          >
            <AiOutlineClose size={24} />
          </button>
        )}
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
}
export default withRouter(Header)
