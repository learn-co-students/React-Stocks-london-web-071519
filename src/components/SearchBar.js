import React from 'react';

class SearchBar extends React.Component {

  state = {
    nameSortChecked: false,
    priceSortChecked: false,
    noneSortChecked: true
  }
  handleFilterChange = event => {
    this.props.updateFilterBy(event.target.value)
  }

  handleSortByNameChange = event => {
    this.setState({nameSortChecked: true})
    this.setState({priceSortChecked: false})
    this.setState({noneSortChecked: false})
    this.props.updateSortBy(event.target.value)

  }

  handleSortByPriceChange = event => {
    this.setState({priceSortChecked: true})
    this.setState({nameSortChecked: false})
    this.setState({noneSortChecked: false})
    this.props.updateSortBy(event.target.value)
  }

  handleSortByNoneChange = event => {
    this.setState({noneSortChecked: true})
    this.setState({priceSortChecked: false})
    this.setState({nameSortChecked: false})
    this.props.updateSortBy(event.target.value)
  }
  
  render() {
    const {handleFilterChange, handleSortByNameChange, handleSortByPriceChange, handleSortByNoneChange} = this
    const {nameSortChecked, priceSortChecked, noneSortChecked} = this.state

    return (
      <div>

        <strong>Sort by:</strong>
        <label>
          <input type="radio" value="Alphabetically" checked={nameSortChecked} onChange={handleSortByNameChange}/>
          Alphabetically
        </label>
        <label>
          <input type="radio" value="Price" checked={priceSortChecked} onChange={handleSortByPriceChange}/>
          Price
        </label>
        <label>
          <input type="radio" value="None" checked={noneSortChecked} onChange={handleSortByNoneChange}/>
          None
        </label>
        <br/>

        <label>
          <strong>Filter:</strong>
          <select onChange={handleFilterChange}>
            <option value="None">None</option>
            <option value="Tech">Tech</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Finance">Finance</option>
          </select>
        </label>


      </div>
    )
  }
}


export default SearchBar;
