'use strict'

const createStore = require('redux/lib/createStore').default

const reducer = require('./reducer')
const actions = require('./actions')
const url = require('./url')
const ui = require('./ui')
const data = require('./data')



const store = createStore(reducer)

const setCategory = actions.setCategory(store)
const clearCategory = actions.clearCategory(store)

const updateUrl = url(setCategory, clearCategory)
const render = ui(setCategory, clearCategory)

store.subscribe(() => setTimeout(() => {
	const state = store.getState()
	updateUrl(state)
	render(state)
}, 1))



data.then(actions.setPhotos(store), (e) => {throw e})
