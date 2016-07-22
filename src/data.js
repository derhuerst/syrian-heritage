'use strict'

const fetch = require('isomorphic-fetch')
const groupBy = require('lodash.groupBy')



const endpoint = 'http://199.217.112.113:8080/picture/picture'
const filters = ['decade', 'color', 'subject', 'view', 'collection', 'location']



const clean = (data) => ({
	  id:         p.id
	, url:        p.Bildname
	, thumb: {
		  url:    p.BildSmall
		, width:  p.width
		, height: p.height
	}
	, decade:     ((p.Decade - p.Decade % 10) || '?').toString()
	, collection: p.Collection
	, color:      p.Color.toLowerCase()
	, location:   p.Location
	, subject: 	  p.Subject
	, view:       p.View
})



const err = (e) => {throw e}

const data = fetch(endpoint)
.then((res) => res.json(), err)
.then((photos) => {
	photos = photos.map(clean)

	const data = {}
	for (let filter of filters)
		data[filter] = groupBy(data.photos, (p) => p[filter])

	return data
}, err)

module.exports = data
