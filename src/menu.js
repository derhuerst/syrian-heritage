'use strict'

const yo = require('yo-yo')



const menu = (currentCat, allCats, setCat, clearCat) => yo `
	<ul>
		${allCats.map((cat) => {
			const onClick = (e) => {
				e.preventDefault()
				e.stopPropagation()
				if (currentCat === cat) clearCat()
				else setCat(cat)
			}
			return yo `
			<li ${currentCat === cat ? 'class="active"' : ''}>
				<a href="#" role="button" aria-haspopup="true"
				   onclick="${onClick}">${cat}</a>
			</li>
			`
		})}
	<ul>`



const noop = () => {}
let dom = menu(null, [], noop, noop)

const render = (currentCat, allCats, setCat, clearCat) => {
	const newDom = menu(currentCat, allCats, setCat, clearCat)
	yo.update(dom, newDom)
	return dom = newDom
}

module.exports = render
