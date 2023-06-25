import './index.css'

const SlickItem = props => {
  const {slickList} = props
  const {title, authorName, coverPic} = slickList
  return (
    <div testid="bookItem" className="each-carousel-item-container">
      <img src={coverPic} alt="" className="each-carousel-item-image" />
      <h1 className="each-carousel-item-container-heading">{title}</h1>
      <p className="each-carousel-item-container-para">{authorName}</p>
    </div>
  )
}

export default SlickItem
