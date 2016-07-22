'use strict'

const initialState = {
	photos: [],
	category: null
}

const reducer = (state = initialState, action) => {

	if (action.type === 'set-photos')
		return Object.assign({}, state, {photos: action.photos})

	if (action.type === 'set-category')
		return Object.assign({}, state, {category: action.category})

	if (action.type === 'clear-category')
		return Object.assign({}, state, {category: null})

	else return state
}

module.exports = reducer
