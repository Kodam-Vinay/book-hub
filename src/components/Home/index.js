import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import SlickItem from '../SlickItem'

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
    hamburgerButtonStatus: false,
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
      console.log(data)
      const parsedData = data.books.map(eachItem => ({
        id: eachItem.id,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        title: eachItem.title,
      }))
      this.setState({slickList: parsedData, apiStatus: constApiStatus.success})
    }
  }

  changeStateHamburger = () => {
    this.setState(prevState => ({
      hamburgerButtonStatus: !prevState.hamburgerButtonStatus,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderSuccessView = () => {
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="home-results-container">
        <h1 className="home-results-container-heading">
          Find Your Next Favorite Books?
        </h1>
        <p className="home-results-container-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/" className="nav-link finds-books-sm-button">
          <button
            type="button"
            className="logout-button home-finds-books-button"
          >
            Find Books
          </button>
        </Link>
        <div className="home-top-rated-books-container">
          <div className="home-top-rated-container">
            <p className="home-top-rated-books-container-text">
              Top Rated Books
            </p>
            <Link to="/" className="nav-link finds-books-bg-button">
              <button
                type="button"
                className="logout-button home-finds-books-button"
              >
                Find Books
              </button>
            </Link>
          </div>
          <ul className="slider-items-container">
            <Slider {...settings}>
              {}
              <SlickItem />
            </Slider>
          </ul>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constApiStatus.success:
        return this.renderSuccessView()
      case constApiStatus.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {hamburgerButtonStatus} = this.state
    return (
      <div className="home-bg-container">
        <>
          <Header
            changeStateHamburger={this.changeStateHamburger}
            hamburgerButtonStatus={hamburgerButtonStatus}
          />
          {hamburgerButtonStatus && (
            <ul className="nav-links-sm-list">
              <Link to="/" className="nav-link">
                <li className="nav-link-list-item">Home</li>
              </Link>
              <Link to="/shelf" className="nav-link">
                <li className="nav-link-list-item">Bookshelves</li>
              </Link>
              <button
                type="button"
                className="logout-button home-finds-books-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </ul>
          )}
        </>
        {this.renderResults()}
      </div>
    )
  }
}
export default Home
