'use strict'

const notify = (msg) => {
	const notification = document.createElement('p')
	notification.setAttribute('class', 'notification')
	notification.innerHTML = msg
	document.body.appendChild(notification)
	setTimeout(() => document.body.removeChild(notification), 5000)
}

module.exports = notify
