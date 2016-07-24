'use strict'

const selector = require('reselect').createSelector



const category = (state) => state.category

const categories = selector(
	(state) => state.photos,
	(photos) => Object.keys(photos)
)

const photos = (state) => state.photos

const photosOfCategory = selector(
	[photos, category],
	(photos, category) => photos[category]
)

module.exports = {category, categories, photos, photosOfCategory}
