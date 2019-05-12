const getTitle = require('./getTitle')
const getPackages = require('./getPackages')

module.exports = ({ url, width, height }) => {
  let package = getPackages(url)
  return {
    type: 'rich',
    version: '1.0',
    provider_name: 'Packstats',
    provider_url: 'https://packstats.herokuapp.com/',
    title: getTitle(package),
    width: width,
    height: height,
    html: `<iframe
          style="width: 100%; overflow: hidden;"
          src="${url}"
          width="${width}"
          height="${height}"
          frameborder="0"
          scrolling="no"
      ></iframe>`.replace(/\s\s+/g, ' '),
  };
};