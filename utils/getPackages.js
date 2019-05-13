import url from 'url'

const route = require('path-match')({
  sensitive: false,
  strict: false,
  end: false,
});

const match = route('/embed/:packages([^/]+[/]*[^/]+)')

module.exports = a => {
  const parsedUrl = url.parse(a)
  const routeParams = match(parsedUrl.pathname)
  return routeParams.packages ? routeParams.packages.split(',') : []
};