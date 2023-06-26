import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'
import Header from '../Header'
import SlickItem from '../SlickItem'
import HamburgerContext from '../../Context/HamburgerContext'
import Footer from '../Footer'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    slickList: [],
    apiStatus: constApiStatus.initial,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: constApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const parsedData = data.books.map(eachItem => ({
        id: eachItem.id,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        title: eachItem.title,
      }))
      this.setState({slickList: parsedData, apiStatus: constApiStatus.success})
    } else {
      this.setState({apiStatus: constApiStatus.failure})
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderSuccessView = () => {
    const {slickList} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="home-results-container">
        <div className="home-results-container-text-container">
          <h1 className="home-results-container-heading">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-results-container-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf" className="nav-link finds-books-sm-button">
            <button
              type="button"
              className="logout-button home-finds-books-button"
            >
              Find Books
            </button>
          </Link>
        </div>
        <div className="home-carousel-footer-section-container">
          <div className="home-top-rated-books-container">
            <div className="home-top-rated-container">
              <h1 className="home-top-rated-books-container-text">
                Top Rated Books
              </h1>
              <Link to="/shelf" className="nav-link finds-books-bg-button">
                <button
                  type="button"
                  className="logout-button home-finds-books-button"
                >
                  Find Books
                </button>
              </Link>
            </div>
            <ul className="slider-unordered-list-container">
              <Slider {...settings}>
                {slickList.map(eachItem => (
                  <SlickItem slickList={eachItem} key={eachItem.id} />
                ))}
              </Slider>
            </ul>
          </div>
          <Footer />
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
        src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687675726/book%20hub/error-image.png"
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
      <div className="home-bg-container">
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
        {this.renderResults()}
      </div>
    )
  }
}
export default Home
