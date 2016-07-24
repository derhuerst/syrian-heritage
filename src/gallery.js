'use strict'

const yo = require('yo-yo')
const Masonry = require('masonry-layout')



const values = (obj) => {
	const r = []
	for (let key in obj) r.push(obj[key])
	return r
}



const photo = (photo) => yo `
	<a class="picture" href="${photo.url}" target="_blank"
	   role="button" aria-haspopup="true">
		<img src="${photo.thumb.url}
		     width="${photo.thumb.width}" height="${photo.thumb.height}"/>
	</a>`

const cluster = (photos) => {
	const dom = yo `
		<section class="cluster">
			${photos.map(photo)}
		</section>`
	const masonry = new Masonry(dom, {fitWidth: true, transitionDuration: 0})
	masonry.appended(dom.childNodes)
	masonry.layout()
	return dom
}

const gallery = (photosByType) => yo `
	<div>
		${values(photosByType).map(cluster)}
	<div>`



let dom = gallery({})

const render = (photosByType) => {
	const newDom = gallery(photosByType)
	yo.update(dom, newDom)
	return dom = newDom
}

module.exports = render
