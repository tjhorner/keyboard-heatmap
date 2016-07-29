var CueSDK = require('cue-sdk-node'),
    SQLite3 = require('sqlite3'),
    moment = require('moment'),
    warna = require('warna'),
    keys = require('./keys.json'),
    enums = require('./node_modules/cue-sdk-node/lib/enums.js');

var heatmapGradient = new warna.Gradient("#00FF00", "#FF0000");

var whatPulseDb = process.env.USERPROFILE + "\\AppData\\Local\\whatpulse\\whatpulse.db",
    db = new SQLite3.Database(whatPulseDb);

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
      keyboard.set(keys[key], color[0], color[1], color[2]);
    }
  }
};

var setKeyboardHeatmap = () => {
  db.serialize(() => {
    db.all("SELECT '" + moment().format('YYYY-MM-DD') + "' AS day, key, count FROM keypress_frequency", (err, rows) => {
      processKeyCounts(rows);
    });
  });
};

setInterval(setKeyboardHeatmap, 5000);

setKeyboardHeatmap();
