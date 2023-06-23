import './index.css'

const Logo = props => {
  const {altText} = props
  return (
    <div className="website-logo-container">
      <img
        src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1687529580/book%20hub/logo.png"
        alt={altText}
        className="website-logo"
      />
      <p className="logo-website-text">ook Hub</p>
    </div>
  )
}
export default Logo
