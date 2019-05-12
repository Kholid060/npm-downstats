import url from 'url'

module.exports = a => {
	let parseUrl = url.parse(a)
	return a.query
}