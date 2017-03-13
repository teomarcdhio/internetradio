const Parser = require('icecast-parser');
const fs = require('fs');
const http = require('http');
var stationurl = "http://216.126.195.37:8078/stream";

const radioStation = new Parser({url: stationurl,
                                keepListen: false,
                                metadataInterval: 1
                                });

var title = 'First' ;
radioStation.on('metadata', function(metadata) {


    if ( title !== metadata.StreamTitle) {
      title = metadata.StreamTitle;
      var path = 'files/';
      var ext = '.mp3';
      var location = path + title + ext;
      console.log(location);
      var track = fs.createWriteStream(location);
      console.log(title);
      http.get( stationurl
      , (res) => {
        res.pipe(track);
      });
    }

});

//radioStation.on('stream', function(stream) {
//    stream.pipe(track);
//});

//http.get( stationurl
//, (res) => {
//  res.pipe(track);
//});
