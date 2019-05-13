import url from 'url'

module.exports = a => {
	let parseUrl = url.parse(a)
	console.log(a)
	let srcURL = parseUrl.query.replace(/url=/, '')
	return srcURL
}