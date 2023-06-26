import {Link} from 'react-router-dom'
import './index.css'

const SlickItem = props => {
  const {slickList} = props
  const {id, title, authorName, coverPic} = slickList
  return (
    <li>
      <Link
        to={`/books/${id}`}
        className="nav-link each-carousel-item-container"
      >
        <img src={coverPic} alt={title} className="each-carousel-item-image" />
        <h1 className="each-carousel-item-container-heading">{title}</h1>
        <p className="each-carousel-item-container-para">{authorName}</p>
      </Link>
    </li>
  )
}

export default SlickItem
