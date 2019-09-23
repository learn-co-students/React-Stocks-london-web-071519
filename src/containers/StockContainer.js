import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  render() {
    const {updatePortfolio} = this.props
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks.map(stock => <Stock key={stock.id} stock={stock} updatePortfolio={updatePortfolio}/>)}
      </div>
    );
  }

}

export default StockContainer;
