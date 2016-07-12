'use strict'

const qs = require('./querystring')



const $ = (s) => document.querySelector(s)
const ul = $('#filters ul')

const dom = (tag, props, content) => {
	const el = document.createElement(tag)
	for (let key in props) el.setAttribute(key, props[key])
	if (Array.isArray(content)) {
		for (let child of content) el.appendChild(child)
	} else if ('string' === typeof content) el.innerHTML = content
	return el
}

const data = (el, key, value) => value
	? el.setAttribute('data-' + key, value)
	: el.getAttribute('data-' + key)



// Filters -> URL
const onValueClick = (e) => {
	e.preventDefault()
	e.stopPropagation()
	const q = {}
	q[data(e.target, 'name')] = data(e.target, 'value')
	qs.add(q)
}

const onFilterClick = (e) => {
	e.preventDefault()
	e.stopPropagation()
	qs.remove(data(e.target, 'name'))
}



const filterEls = {}
const valueEls = {}

const addFilter = (name, values) => {
	if (!filterEls[name]) filterEls[name] = {}
	if (!valueEls[name]) valueEls[name] = {}

	const list = []
	for (let v of values) {
		const a = dom('a', {
			  href: '#'
			, 'data-name': name
			, 'data-value': v
			, role: 'button'
		}, v)
		a.addEventListener('click', onValueClick)

		const li = dom('li', {
			class: qs.current[name] === v ? 'active' : ''
		}, [a])
		valueEls[name][v] = li
		list.push(li)
	}

	const a = dom('a', {
		  href: '#'
		, 'data-name': name
		, 'aria-haspopup': 'true'
	}, name)
	a.addEventListener('click', onFilterClick)

	const li = dom('li', {
		class: qs.current[name] ? 'active' : ''
	}, [
		a,
		dom('ul', {}, list)
	])
	filterEls[name] = li
	ul.appendChild(li)
}

// show the appropriate menu items as active
const applyQuery = (query) => {
	const active = Array.from(ul.querySelectorAll('.active'))
	for (let el of active) el.classList.remove('active')

	for (let name in query) {
		const value = query[name]

		if (filterEls[name]) filterEls[name].classList.add('active')
		if (valueEls[name] && valueEls[name][value])
			valueEls[name][value].classList.add('active')
	}
}

module.exports = {addFilter, applyQuery}



// URL -> Filters
qs.on('change', applyQuery)
setTimeout(() => applyQuery(qs.current), 5)
