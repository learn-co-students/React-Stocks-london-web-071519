import React, { Component } from 'react';
import Stock from '../components/Stock'
import StockContainer from './StockContainer';

class PortfolioContainer extends Component {

  render() {
    return (
      <div >
        <h2>My Portfolio</h2>
          {
            this.props.stocks.map( stock => {
              return < Stock onClick={() => {this.props.sellStock(this.props.stock)}} key={stock.id} stock={stock}/>
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
