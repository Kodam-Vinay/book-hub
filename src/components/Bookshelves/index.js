import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import HamburgerContext from '../../Context/HamburgerContext'
import FilterResults from '../FilterResults'
import BookShelvesItem from '../BookShelvesItem'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    activeFilterId: bookshelvesList[0].id,
    activeFilter: bookshelvesList[0].value,
    bookDetailsList: [],
    apiStatus: constApiStatus.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getResults()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onPressEnter = event => {
    if (event.key === 'Enter') {
      this.getResults()
    }
  }

  onClickFilterButton = (id, value) => {
    this.setState({activeFilterId: id, activeFilter: value}, this.getResults)
  }

  onSearchBooksList = () => {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: constApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeFilter, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${searchInput}`
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
        rating: eachItem.rating,
        readStatus: eachItem.read_status,
        title: eachItem.title,
      }))
      this.setState({
        bookDetailsList: parsedData,
        apiStatus: constApiStatus.success,
      })
    } else {
      this.setState({apiStatus: constApiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {bookDetailsList, searchInput} = this.state
    const checkBooksListLength = bookDetailsList.length > 0
    return (
      <>
        {checkBooksListLength ? (
          <ul className="book-shelves-results-container">
            {bookDetailsList.map(eachItem => (
              <BookShelvesItem bookDetailsList={eachItem} key={eachItem.id} />
            ))}
            <Footer />
          </ul>
        ) : (
          <div className="no-books-found-container">
            <img
              src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687712966/book%20hub/not-found.png"
              alt="no books"
              className="home-failure-image"
            />
            <p className="no-books-found-container-text">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </>
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

  renderFilterResults = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="filter-results-container">
        {bookshelvesList.map(eachItem => (
          <FilterResults
            key={eachItem.id}
            bookshelvesList={eachItem}
            onClickFilterButton={this.onClickFilterButton}
            isActive={activeFilterId === eachItem.id}
          />
        ))}
      </ul>
    )
  }

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
    const {searchInput} = this.state

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

        <div className="book-shelves-search-filter-container">
          <div className="book-search-container-sm">
            <input
              type="search"
              className="book-shelves-search-input"
              onChange={this.onChangeSearchInput}
              value={searchInput}
              onKeyDown={this.onPressEnter}
            />
            <button
              type="button"
              className="search-button"
              data-testid="searchButton"
              onClick={this.onSearchBooksList}
            >
              <BsSearch size={16} color="#94A3B8" />
            </button>
          </div>
          <div className="filter-by-and-result-container">
            <div className="filter-by-shelf-container">
              <h1 className="book-shelves-filter-text">Bookshelves</h1>
              {this.renderFilterResults()}
            </div>
            <div className="home-books-result-container">
              <div className="all-books-heading-search-container">
                <h1 className="all-books-heading">All Books</h1>
                <div className="book-search-container-lg">
                  <input
                    type="search"
                    className="book-shelves-search-input"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                    onKeyDown={this.onPressEnter}
                  />
                  <button
                    type="button"
                    className="search-button"
                    data-testid="searchButton"
                    onClick={this.onSearchBooksList}
                  >
                    <BsSearch size={16} color="#94A3B8" />
                  </button>
                </div>
              </div>
              {this.renderResults()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default BookShelves
