// This file is used to generate the keys.json found in the root directory.
// You probably shouldn't try to use this since I haven't documented exactly how
// to yet.

var csvParse = require('csv-parse'),
    fs = require('fs');

csvParse(fs.readFileSync("./heatmapExport.csv").toString(), { }, (err, csv) => {
  var keyCodes = { };
  csv.forEach((row) => { keyCodes[row[0]] = row[1] });
  fs.unlinkSync("../keys.json");
  fs.writeFileSync("../keys.json", JSON.stringify(keyCodes));
});
