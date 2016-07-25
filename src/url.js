'use strict'

const selector = require('reselect').createSelector
const createHistory = require('history/lib/createBrowserHistory').default

const selectors = require('./selectors')



const url = (setCategory, clearCategory) => {

	const history = createHistory()



	const onLocationChange = (location) => {
		if (!location) return
		if ('string' !== typeof location.hash) return
		const hash = location.hash.replace(/^#?/, '')
		if (hash.length > 0) setCategory(hash)
		else clearCategory()
	}

	// onLocationChange(location)
	history.listen(onLocationChange)



	return selector(
		selectors.category,
		(category) => {history.push({pathname: '#', hash: category})}
	)
}

module.exports = url
