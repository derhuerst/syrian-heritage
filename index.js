'use strict'

const Masonry = require('masonry-layout')

const gallery = document.getElementById('gallery')
const masonry = new Masonry(gallery, {
	itemSelector:       '#gallery .picture',
	fitWidth:           true,
	transitionDuration: 0
})
