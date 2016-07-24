'use strict'

const selector = require('reselect').createSelector

const selectors = require('./selectors')
const menu = require('./menu')
const gallery = require('./gallery')



const ui = (setCategory, clearCategory) => {

	const renderMenu = selector(
		[selectors.category, selectors.categories],
		(category, categories) =>
			menu(category, categories, setCategory, clearCategory)
	)

	const renderGallery = selector(
		selectors.photosOfCategory,
		gallery
	)

	return (state) => {
		renderMenu(state)
		renderGallery(state)
	}
}

module.exports = ui
