'use strict'

const yo = require('yo-yo')
const Masonry = require('masonry-layout')



const photo = (photo) => yo `
	<a class="picture" href="${photo.url}" target="_blank"
	   role="button" aria-haspopup="true">
		<img src="${photo.thumb.url}"
		     width="${photo.thumb.width}" height="${photo.thumb.height}"/>
	</a>`

const heading = (type) => yo `
	<h2>${type}</h2>`

const cluster = (photos) => yo `
	<section class="cluster">${photos.map(photo)}</section>`

const gallery = (photosByType) => {
	const children = []
	for (let type in photosByType) {
		children.push(heading(type))
		children.push(cluster(photosByType[type]))
	}
	return yo `<div>${children}<div>`
}



let dom = gallery({})
document.querySelector('#gallery').appendChild(dom)

const render = (photosByType) => {
	const newDom = gallery(photosByType)
	yo.update(dom, newDom)

	for (let cluster of dom.querySelectorAll('.cluster'))
		new Masonry(cluster, {fitWidth: true, transitionDuration: 0}).layout()
}

module.exports = render
