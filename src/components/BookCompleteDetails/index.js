import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'
import Header from '../Header'
import HamburgerContext from '../../Context/HamburgerContext'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookCompleteDetails extends Component {
  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="home-failure-div-container">
      <img
        src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687675726/book%20hub/Group_7522_wuar7o.png"
        alt="failure view"
        className="home-failure-image"
      />
      <p className="home-failure-text">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="logout-button"
        onClick={() => this.getResults()}
      >
        Try Again
      </button>
    </div>
  )

  render() {
    return (
      <div className="book-shelves-bg-container">
        <HamburgerContext.Consumer>
          {value => {
            const {hamburgerButtonStatus, changeStateHamburger} = value
            const onClickClose = () => {
              changeStateHamburger(false)
            }
            return (
              <>
                <Header />
                {hamburgerButtonStatus && (
                  <ul className="nav-links-sm-list">
                    <Link to="/" className="nav-link">
                      <li className="nav-link-list-item home-nav-item">Home</li>
                    </Link>
                    <Link to="/shelf" className="nav-link">
                      <li className="nav-link-list-item home-nav-item">
                        Bookshelves
                      </li>
                    </Link>
                    <button
                      type="button"
                      className="logout-button home-nav-links-sm-list-logout-button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      className="hamburger-button"
                      onClick={onClickClose}
                    >
                      <AiFillCloseCircle size={24} />
                    </button>
                  </ul>
                )}
              </>
            )
          }}
        </HamburgerContext.Consumer>
      </div>
    )
  }
}
export default BookCompleteDetails
