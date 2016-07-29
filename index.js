var CueSDK = require('cue-sdk-node'),
    SQLite3 = require('sqlite3'),
    moment = require('moment'),
    warna = require('warna'),
    keys = require('./keys.json'),
    enums = require('./node_modules/cue-sdk-node/lib/enums.js');

var argv = require('minimist')(process.argv);

var verbose = argv.verbose;

console.verbose = (message) => {
  if(verbose) console.log(message);
};

var heatmapGradient = new warna.Gradient(argv.color1 || "#00FF00", argv.color2 || "#FF0000");

var whatPulseDb = argv.database || process.env.USERPROFILE + "\\AppData\\Local\\whatpulse\\whatpulse.db",
    db = new SQLite3.Database(whatPulseDb);

console.verbose("WhatPulse database defined as " + whatPulseDb);

var keyboard = new CueSDK.CueSDK();

var rgbToArray = (rgb) => {
  return [rgb.red, rgb.green, rgb.blue];
};

var processKeyCounts = (dbRows) => {
  var keyCounts = { },
      max = 0;

  dbRows.forEach((row) => {
    if(!keyCounts[row.key]) keyCounts[row.key] = 0;
    keyCounts[row.key] += row.count;
    if(keyCounts[row.key] > max) max = keyCounts[row.key];
  });

  var keyArrays = [ ];

  for(var key in keyCounts){
    var keyCount = keyCounts[key],
        color = rgbToArray(heatmapGradient.getPosition((keyCount * 100 / max) / 100).rgb);
    if(keys[key]){
      console.verbose("Setting " + keys[key] + " to color " + color.toString());
      keyboard.set(keys[key], color[0], color[1], color[2]);
    }
  }
};

var setKeyboardHeatmap = () => {
  console.verbose("Refreshing...");
  db.serialize(() => {
    var finalizedRows = [ ];
    console.verbose("Selecting stuff from db...");
    db.each("SELECT '" + moment().format('YYYY-MM-DD') + "' AS day, key, count FROM keypress_frequency", (err, row) => {
      finalizedRows.push(row);
    }, () => {
      console.verbose("Processed " + finalizedRows.length + " rows...");
      processKeyCounts(finalizedRows);
    });
  });
};

setInterval(setKeyboardHeatmap, argv["refresh-interval"] ? parseInt(argv["refresh-interval"]) : 5000);

setKeyboardHeatmap();
