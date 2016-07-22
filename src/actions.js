'use strict'

const setPhotos = (store) => (photos) =>
	store.dispatch({type: 'set-photos', photos})

const setCategory = (store) => (category) =>
	store.dispatch({type: 'set-category', category})

const clearCategory = (store) => () =>
	store.dispatch({type: 'clear-category'})

module.exports = {setCategory, clearCategory, setPhotos}
