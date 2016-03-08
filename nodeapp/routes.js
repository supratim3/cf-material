var express = require('express');
var router = express.Router();
//var SolrQ = require('./solr-query');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'eServices Material Management' });
});


router.get('/materialsSearch', function(req, res, next) {

	var organization_id = req.get("organization_id"),
		locale = req.get("locale"),
		searchQ = req.query.search,
		app = req.app,
		constants = app.get('constants'),
		config = app.get('appconfig'),
		reqObject = {
			//"uri": config.devclouduri + "/" +config.inventorySearchPath + "/" + organization_id +"/"+searchQ +"/"+ locale
			"uri": config.devclouduri  + "/" +config.inventorySearchPath
		},
		documents;

	// queryObject.q = searchQ;
	// queryObject.orgid = organization_id;
	// solrQ = new SolrQ({uri: constants.CONF_RESTSERVICE_BASEURI, collection: constants.SOLR_COLLECTION});
	// documents = solrQ.getDocuments(queryObject, req.app);
	reqObject.qs = {"itemNumber": searchQ, "organizationId": organization_id, "locale": locale};
	reqObject.headers = {
		"organization_id": organization_id,
		"locale": (locale||"US")
	};
	var req = request.get(reqObject, function(error, response, body){
		if(error){
			console.log("error occured", error);
			res.status(500).send({"error": "Something went wrong"});
		}
		else if(response.statusCode==200){
			res.status(200).type('json').send(body).end();
		}
	});
	console.log("request", req.uri.href);

});




module.exports = router;
