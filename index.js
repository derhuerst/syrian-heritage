'use strict'

const notify = require('./notify')
const filters = require('./filters')
const gallery = require('./gallery')
const data = require('./data')



const main = (data) => {
	for (let name of data.filters) {
		const filter = data[name]
		const values = Object.keys(filter)
		filters.addFilter(name, values)
	}

	gallery.setData(data.photos)
}

data.then(main, (e) => notify(e.message))
