'use strict'

const Masonry = require('masonry-layout')

const notify = require('./notify')
const filters = require('./filters')
const data = require('./data')



const gallery = document.getElementById('gallery')
const masonry = new Masonry(gallery, {
	itemSelector:       '#gallery .picture',
	fitWidth:           true,
	transitionDuration: 0
})



const main = (data) => {
	console.log('main')
	for (let name of data.filters) {
		const filter = data[name]
		const values = Object.keys(filter)
		filters.addFilter(name, values)
	}
}

data.then(main, (e) => notify(e.message))
