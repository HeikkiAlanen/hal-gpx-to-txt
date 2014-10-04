var fs = require('fs')
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile('./passit/passit_20131118-ks.gpx', function(err, data) {
    parser.parseString(data, function (err, result) {
		var poiCount = result.gpx.wpt.length;
		var pois = result.gpx.wpt;
		var poiString = "";

		for (i = 0; i < poiCount; i++) {
			poiString += pois[i].name + "," + pois[i].$.lat + "," + pois[i].$.lon + "\r\n";
		}
		
		fs.writeFile('./passit/passit.txt', poiString, function (err) {
			if (err) throw err;
			console.log('It\'s saved!');
		});
    });
});
