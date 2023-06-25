import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687530265/book%20hub/not%20found.png"
      alt="not found"
      className="not-found-image"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/" className="nav-link">
      <button className="logout-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
