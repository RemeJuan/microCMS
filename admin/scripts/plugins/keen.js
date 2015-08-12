!function(a,b){a("Keen","https://d26b395fwzu5fz.cloudfront.net/3.2.6/keen.min.js",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]=function(b){c["_"+a].clients=c["_"+a].clients||{},c["_"+a].clients[b.projectId]=this,this._config=b},c[a].ready=function(b){c["_"+a].ready=c["_"+a].ready||[],c["_"+a].ready.push(b)},d=["addEvent","setGlobalProperties","trackExternalLink","on"];for(var g=0;g<d.length;g++){var h=d[g],i=function(a){return function(){return this["_"+a]=this["_"+a]||[],this["_"+a].push(arguments),this}};c[a].prototype[h]=i(h)}e=document.createElement("script"),e.async=!0,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);

var client = new Keen({
  projectId: "559c160990e4bd6948c42ed3",
    readKey: "ae39ee1990b46793b2d0bad40d1b07de597073439d5d18badc44144baa059cde4a852acecaa538f6cb40606f23af7787e343e17865992446eff8eed3536114fa1a1b98ee9be3e9679de7527bf379064053533769034cb3c44c7e72649580e8d38a6b70d0bb0fa9b6535fcc9ae54c9aaa"
});

Keen.ready(function(){

	var visitsByPageQuery = new Keen.Query("count", {
		eventCollection: "Visit",
		interval: "daily",
		targetProperty: "keen.id",
		timeframe: "this_30_days",
		timezone: "UTC"
	});

	var visitsByPageChart = new Keen.Dataviz()
	  .el(document.getElementById("keen-pages"))
	  .chartType("areachart")
	  .prepare(); // start spinner

	var req = client.run(visitsByPageQuery, function(err, res){
	  if (err) {
	    // Display the API error
	    visitsByPageChart.error(err.message);
	  }
	  else {
	    // Handle the response
	    visitsByPageChart
	      .parseRequest(this)
	      .title(" ")
	      .render();
	  }
	});

	var browserSplitQuery = new Keen.Query("count", {
		eventCollection: "Visit",
		filters: [{"operator":"not_contains","property_name":"Browser Name","property_value":"undefined"}],
		groupBy: "Browser Name",
		targetProperty: "keen.id",
		timeframe: "this_30_days",
		timezone: "UTC"
	});

	var browserSplitChart = new Keen.Dataviz()
	  .el(document.getElementById("keen-browsers"))
	  .chartType("piechart")
	  .prepare(); // start spinner

	var req = client.run(browserSplitQuery, function(err, res){
	  if (err) {
	    // Display the API error
	    browserSplitChart.error(err.message);
	  }
	  else {
	    // Handle the response
	    browserSplitChart
	      .parseRequest(this)
	      .title(" ")
	      .render();
	  }
	});

	var visitsTotalQuery = new Keen.Query("count", {
		eventCollection: "Visit",
		targetProperty: "keen.id",
		timeframe: "this_30_days",
		timezone: "UTC"
	});

	client.draw(visitsTotalQuery, document.getElementById("keen-visits"), {
		title: " ",
	});

  // Re-run and refresh every 15 minutes...
  // setInterval(req.refresh, 1000 * 60 * 15);
});