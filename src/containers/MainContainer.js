import React, {Component} from 'react';
import StockContainer from './StockContainer';
import PortfolioContainer from './PortfolioContainer';
import SearchBar from '../components/SearchBar';
import {timingSafeEqual} from 'crypto';

class MainContainer extends Component {
	state = {stocks: [], filter: 'Tech', sortBy: '', portfolio: []};

	getStocks = () =>
		fetch('http://localhost:4000/stocks')
			.then((resp) => resp.json())
			// .then(console.log);
			.then((stocks) => this.setState({stocks}));

	componentDidMount() {
		this.getStocks();
	}

	setFilter = (filter) => {
		this.setState({filter});
	};

	setSort = (selection) => {
		if (!this.state.sortBy.includes(selection))
			this.setState({sortBy: [...this.state.sortBy, selection]});
	};

	filterStocks = () =>
		this.state.stocks.filter((stock) => stock.type === this.state.filter);

	sortedAlphabetically = () => {
		if (this.state.sortBy.includes('Alphabetically')) {
			return this.filterStocks().sort((a, b) =>
				a.name.toLowerCase().localeCompare(b.name.toLowerCase())
			);
		} else {
			return this.filterStocks();
		}
	};

	sortedByPrice = (stocks) => {
		if (this.state.sortBy.includes('Price')) {
			return stocks.sort((a, b) => (a.price < b.price ? 1 : -1));
		} else {
			return stocks;
		}
	};

	sortedNFiltered = () => {
		return this.sortedByPrice(this.sortedAlphabetically());
	};

	buyStock = (stock) => {
		const newStocks = this.state.stocks.filter((s) => stock !== s);
		this.setState({
			stocks: newStocks,
			portfolio: [stock, ...this.state.portfolio]
		});
	};

	sellStock = (stock) => {
		const newStocks = this.state.portfolio.filter((s) => stock !== s);
		this.setState({
			portfolio: newStocks,
			stocks: [stock, ...this.state.stocks]
		});
	};

	render() {
		return (
			<div>
				<SearchBar filter={this.setFilter} sort={this.setSort} />
				<div className="row">
					<div className="col-8">
						<StockContainer
							stocks={this.sortedNFiltered()}
							handleClick={this.buyStock}
						/>
					</div>
					<div className="col-4">
						<PortfolioContainer
							portfolio={this.state.portfolio}
							handleClick={this.sellStock}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContainer;
