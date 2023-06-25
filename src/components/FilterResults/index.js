import './index.css'

const FilterResults = props => {
  const {bookshelvesList, onClickFilterButton, isActive} = props
  const {id, value, label} = bookshelvesList
  const onClickButton = () => {
    onClickFilterButton(id, value)
  }
  const changeSmColor = isActive ? 'change-filter-sm-color' : ''
  const changeLgColor = isActive ? 'change-filter-lg-color' : ''
  return (
    <li>
      <button
        type="button"
        className={`filter-list-item-sm ${changeSmColor}`}
        onClick={onClickButton}
      >
        {label}
      </button>
      <button
        type="button"
        className={`filter-list-item-lg ${changeLgColor}`}
        onClick={onClickButton}
      >
        {label}
      </button>
    </li>
  )
}
export default FilterResults
