config = {
	"env": "development",
	"service.baseuri": "gis08248.devcloud.ge.com:2181",
	"solrCollection": "inventory",
	"profile.url": "/profileservice/profile/sso/",
	"devclouduri": "http://gis08124.devcloud.ge.com:9030",
	//"inventorySearchPath": "material/v1/searchitem"
	"inventorySearchPath": "material/v1/solr/searchitems"
};

module.exports = config;