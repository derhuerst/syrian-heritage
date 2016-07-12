'use strict'

const Emitter = require('component-emitter')
const createHistory = require('history/lib/createBrowserHistory').default
const querystring = require('querystring')

const pound = /^#?/



const history = createHistory()
const qs = new Emitter()
module.exports = qs

// URL -> JS

qs.current = querystring.parse(location.hash.replace(pound, ''))

history.listen((data) => {
	const hash = data.hash.replace(pound, '')
	const query = querystring.parse(hash)
	qs.current = query
	qs.emit('change', query)
})



// JS -> URL

qs.set = (query) => {
	const hash = querystring.stringify(query)
	history.push({pathname: '#', hash})
}

qs.add = (query) => {
	Object.assign(qs.current, query)
	qs.set(qs.current)
}

qs.remove = (key) => {
	delete qs.current[key]
	qs.set(qs.current)
}
