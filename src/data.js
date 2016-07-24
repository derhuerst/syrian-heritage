'use strict'

const fetch = require('isomorphic-fetch')
const groupBy = require('lodash.groupBy')



const endpoint = 'http://199.217.112.113:8080/picture/picture'
const filters = ['decade', 'color', 'subject', 'view', 'collection', 'location']



const clean = (data) => ({
	  id:         data.id
	, url:        data.Bildname
	, thumb: {
		  url:    data.BildSmall
		, width:  data.width
		, height: data.height
	}
	, decade:     ((data.Decade - data.Decade % 10) || '?').toString()
	, collection: data.Collection
	, color:      data.Color.toLowerCase()
	, location:   data.Location
	, subject: 	  data.Subject
	, view:       data.View
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
