'use strict'

const createStore = require('redux/lib/createStore').default

const actions = require('./actions')
const ui = require('./ui')
const reducer = require('./reducer')
const data = require('./data')



const store = createStore(reducer)

const setCategory = actions.setCategory(store)
const clearCategory = actions.clearCategory(store)

const render = ui(setCategory, clearCategory)
store.subscribe(() => render(store.getState()))



data.then(actions.setPhotos(store), (e) => {
	// todo
	// notify(e.message)
	throw e
})



// todo: watch & update querystring
