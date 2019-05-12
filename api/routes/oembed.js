const { Router } = require('express')

const router = Router()

const getQuery = require('../../utils/getQuery')
const oembedObject = require('../../utils/oembedObject')

router.get('/oembed', function (req, res, next) {
	let fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
	let urlQuery = req.query.url
	if(urlQuery){
	  let embed = oembedObject({
	    url: urlQuery,
	    width: req.query.width || 700,
	    height: req.query.height || 500
	  })
	  res.send(embed)
	}else{
	  res.status(400).send({
	    message: 'url query is not found'
	  })
	}
})

module.exports = router
