SolrQ = function(options){
	console.log("Initializing solr query object with", options);

	this.options = options;


};

SolrQ.prototype.getUri = function(){
	return this.options.uri + "/" + this.options.collection;
}

SolrQ.prototype.getDocuments = function(queryObject){
	console.log("solrQ.getDocuments queryObject", queryObject)

	http.get(this.getUri()).success
	return {q: queryObject.q};
};


module.exports = SolrQ;