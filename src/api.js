const stocksURL = 'http://localhost:3000/stocks'

const getStocks = () => {
    return fetch(stocksURL)
        .then(resp => resp.json())
}

export default {getStocks}