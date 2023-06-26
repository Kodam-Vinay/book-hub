import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const BookShelvesItem = props => {
  const {bookDetailsList} = props
  const {id, authorName, coverPic, rating, readStatus, title} = bookDetailsList
  return (
    <li>
      <Link
        to={`/books/${id}`}
        className="nav-link book-shelves-item-container"
      >
        <img
          src={coverPic}
          alt={title}
          className="book-shelves-item-container-image"
        />
        <div className="book-shelves-item-text-container">
          <h1 className="book-shelves-item-text-container-title">{title}</h1>
          <p className="book-shelves-item-text-container-author-name">
            {authorName}
          </p>
          <div className="book-shelves-item-avg-rating-container">
            <p className="book-shelves-item-avg-text">Avg Rating</p>
            <BsFillStarFill color="#FBBF24" />
            <p className="book-shelves-item-rating-text">{rating}</p>
          </div>
          <p className="book-shelves-item-status">
            Status:{' '}
            <span className="book-shelves-item-reading-status">
              {readStatus}
            </span>
          </p>
        </div>
      </Link>
    </li>
  )
}
export default BookShelvesItem
