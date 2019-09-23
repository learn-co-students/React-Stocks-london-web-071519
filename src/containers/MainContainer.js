import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
import API from '../api'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    sortBy: 'None',
    filterBy: 'None'
  }

  componentDidMount() {
      API.getStocks()
        .then(stocks => this.setState({stocks}))
  }

  addStockToPorfolio = porfolioStock => {
      const stocks = [...this.state.stocks].filter(stock => stock !== porfolioStock)
      this.setState({stocks})
      const portfolio = [porfolioStock, ...this.state.portfolio]
      this.setState({portfolio})
  }

  removeStockFromPortfolio = porfolioStock => {
      const portfolio = [...this.state.portfolio].filter(stock => stock !== porfolioStock)
      this.setState({portfolio})
      const stocks = [porfolioStock, ...this.state.stocks]
      this.setState({stocks})
  }

  updatePortfolio = porfolioStock => {
    if (this.state.stocks.includes(porfolioStock)) {
      this.addStockToPorfolio(porfolioStock)
    } else {this.removeStockFromPortfolio(porfolioStock)}
  }

  updateFilterBy = filterBy => {
    this.setState({filterBy})
  }

  filteredStocks = () => {
    switch (this.state.filterBy) {
      case 'Tech': {
        let techFiltered = [...this.state.stocks].filter(stock => stock.type === 'Tech')
        return techFiltered
      }
      case 'Sportswear': {
        let sportswearFiltered = [...this.state.stocks].filter(stock => stock.type === 'Sportswear')
        return sportswearFiltered
      }
      case 'Finance': {
        let financeFiltered = [...this.state.stocks].filter(stock => stock.type === 'Finance')
        return financeFiltered
      }
      default: 
        return this.state.stocks
    }
  }

  sortByPrice = (stock1, stock2) => stock1.price - stock2.price

  sortByName = (stock1, stock2) => {
    if (stock1.name > stock2.name) {
      return 1
    } else if (stock1.name < stock2.name) {
      return -1
    } else {
      return 0
    }
  }

  sortedStocks = filteredStock => {
    if (this.state.sortBy === 'Alphabetically') {
      return filteredStock.sort(this.sortByName)
    } else if (this.state.sortBy === 'Price') {
      return filteredStock.sort(this.sortByPrice)
    } else {
      return filteredStock
    }
  }

  updateSortBy = sortBy => {
    this.setState({sortBy})
  }

  render() {
    const {portfolio} = this.state
    const {updatePortfolio, sortedStocks, filteredStocks, updateFilterBy, updateSortBy} = this
    return (
      <div>
        <SearchBar updateFilterBy={updateFilterBy} updateSortBy={updateSortBy}/>
          <div className="row">
            <div className="col-8">
              <StockContainer stocks={sortedStocks(filteredStocks())} updatePortfolio={updatePortfolio}/>
            </div>
            <div className="col-4">
              <PortfolioContainer portfolio={portfolio} updatePortfolio={updatePortfolio}/>
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
