var fs = require('fs')
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile('./passit/passit_20131118-wo-track.gpx', function(err, data) {
    parser.parseString(data, function (err, result) {
		var poiCount = result.gpx.wpt.length;
		var pois = result.gpx.wpt;
		var poiString = "";

		for (i = 0; i < poiCount; i++) {
			var poiName = String(pois[i].name).replace(",", ";", "g");
			//var newPoiName = poiName.replace(",", ";", "g");
			//var newPoiName2 = newPoiName.replace(',', ';', 'g');
			poiString +=  poiName + "," + pois[i].$.lat + "," + pois[i].$.lon + "\r\n";
		}
		
		fs.writeFile('./passit/passit.txt', poiString, function (err) {
			if (err) throw err;
			console.log('It\'s saved!');
		});
    });
});
