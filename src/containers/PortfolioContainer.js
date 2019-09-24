import React, {Component} from 'react';
import Stock from '../components/Stock';

class PortfolioContainer extends Component {
	listPortfolio = () =>
		this.props.portfolio.map((stock) => (
			<Stock stock={stock} handleClick={this.props.handleClick} />
		));
	render() {
		return (
			<div>
				<h2>My Portfolio</h2>
				{this.listPortfolio()}
			</div>
		);
	}
}

export default PortfolioContainer;
