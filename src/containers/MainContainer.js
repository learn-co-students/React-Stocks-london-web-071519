import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const STOCKURL = 'http://localhost:3000/stocks'

const sortByName = (a, b) => a.name.localeCompare(b.name)

class MainContainer extends Component {


  state = {
    stocks: [],
    purchasedStocks: [],
    sortBy: '',
    filter: ''
  }

  fetchData = () => {
    return fetch(STOCKURL)
      .then(resp => resp.json())
  }

  componentDidMount() {
    this.fetchData()
      .then(stocks => {
        this.setState({ stocks })
      })
  }

  boughtStock = stock => {
    let newArray = [...this.state.purchasedStocks, stock]
    this.setState({ purchasedStocks: newArray })
  }

  sellStock = stock => {
    let newArray = [...this.state.purchasedStocks]
    let result = newArray.find(stock)
  }

  toggleSortBy = (e) => {
    // debugger
    e.target.checked ? e.target.checked === false : e.target.checked === true
    this.setState({ sortBy: e.target.value })
  }

  sortedStocks = (stocks) => {
    let myArray = [...stocks]
    switch (this.state.sortBy) {
      case 'Alphabetically':
        {
          return myArray.sort(sortByName)
        }
      case 'Price':
        return myArray.sort(function (a, b) { return a.price - b.price })
      default:
        return stocks
    }

  }

  toggleFilter = (e) => {
    this.setState({ filter: e.target.value })
  }

  filteredStocks = (stocks) => {
    let filterArray = [...stocks]
    switch (this.state.filter) {
      case 'Tech':
          return filterArray.filter(stock => stock.type === 'Tech')
      case 'Sportswear':
        return filterArray.filter(stock => stock.type === 'Sportswear')
      case 'Finance':
        return filterArray.filter(stock => stock.type === 'Finance')
      default:
        return stocks
    }
  }

  sortedAndFilteredStocks = () => {
    return this.filteredStocks(this.sortedStocks(this.state.stocks))
  }

  render() {
    return (
      <div>
        <SearchBar toggleFilter={this.toggleFilter} toggleSortBy={this.toggleSortBy} />

        <div className="row">
          <div className="col-8">

            <StockContainer boughtStock={this.boughtStock} stocks={this.sortedAndFilteredStocks(this.state.stocks)} />

          </div>
          <div className="col-4">

            <PortfolioContainer sellStock={this.sellStock} stocks={this.state.purchasedStocks} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
