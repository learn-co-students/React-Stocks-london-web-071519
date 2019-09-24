import React, {Component} from 'react';
import Stock from '../components/Stock';

class StockContainer extends Component {
	listStocks = () => {
		return this.props.stocks.map((stock) => (
			<Stock stock={stock} handleClick={this.props.handleClick} />
		));
	};

	render() {
		return (
			<div>
				<h2>Stocks</h2>
				{this.listStocks()}
			</div>
		);
	}
}

export default StockContainer;
