import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import HamburgerContext from '../../Context/HamburgerContext'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookCompleteDetails extends Component {
  state = {
    apiStatus: constApiStatus.initial,
    bookCompleteDetails: {},
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: constApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const parsedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
        id: data.book_details.id,
      }
      this.setState({
        bookCompleteDetails: parsedData,
        apiStatus: constApiStatus.success,
      })
    } else {
      this.setState({apiStatus: constApiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {bookCompleteDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookCompleteDetails
    return (
      <div className="book-complete-details-div">
        <div className="book-complete-details-image-and-text-container">
          <img
            src={coverPic}
            alt={title}
            className="book-complete-details-image"
          />
          <div className="book-complete-details-text-container">
            <h1 className="book-complete-details-text-container-title">
              {title}
            </h1>
            <p className="book-complete-details-text-container-author">
              {authorName}
            </p>
            <div className="book-complete-details-item-avg-rating-container">
              <p className="book-complete-details-avg-text">Avg Rating</p>
              <BsFillStarFill color="#FBBF24" />
              <p className="book-complete-details-rating-text">{rating}</p>
            </div>
            <p className="book-complete-details-status">
              Status:{' '}
              <span className="book-complete-details-reading-status">
                {readStatus}
              </span>
            </p>
          </div>
        </div>

        <hr className="horizontal-rule" />
        <div className="about-book-author-div-container">
          <h1 className="about-book-author-div-container-author">
            About Author
          </h1>
          <p className="about-book-author-div-container-author-text">
            {aboutAuthor}
          </p>

          <h1 className="about-book-author-div-container-author">About Book</h1>
          <p className="about-book-author-div-container-author-text">
            {aboutBook}
          </p>
        </div>
      </div>
    )
  }

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

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constApiStatus.success:
        return this.renderSuccessView()
      case constApiStatus.inProgress:
        return this.renderLoaderView()
      case constApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

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
        <div className="book-complete-details-div-container">
          {this.renderResults()}
          <Footer />
        </div>
      </div>
    )
  }
}
export default BookCompleteDetails
