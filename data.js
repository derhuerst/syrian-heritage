'use strict'

const fetch = require('isomorphic-fetch')
const groupBy = require('lodash.groupBy')



const endpoint = 'http://199.217.112.113:8080/picture/picture'
const filters = ['collection', 'color', 'location', 'motif', 'view']



const err = (e) => {throw e}

const data = fetch(endpoint)
.then((res) => res.json(), err)
.then((photos) => {
	const data = {}

	data.photos = photos.map((p) => ({
		  id:         p.id
		, url:        p.Bildname
		, thumb: {
			  url:    p.BildSmall
			, width:  p.width
			, height: p.height
		}
		, collection: p.Collection
		, color:      p.Color
		, location:   p.Location
		, motif:      p.Subject
		, view:       p.View
	}))

	for (let filter of filters)
		data[filter] = groupBy(data.photos, (p) => p[filter])

	data.filters = filters
	return data
}, err)

module.exports = data
