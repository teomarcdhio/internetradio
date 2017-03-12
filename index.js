const Parser = require('icecast-parser');
const fs = require('fs');
const http = require('http');
var stationurl = "http://216.126.195.37:8078/stream";
var track = fs.createWriteStream('myOutput.mp3');
const radioStation = new Parser({url: stationurl,
                                keepListen: true,
                                metadataInterval: 1
                                });

radioStation.on('metadata', function(metadata) {
    console.log(metadata.StreamTitle);
});

radioStation.on('stream', function(stream) {
    stream.pipe(track);
});

//http.get( stationurl
//, (res) => {
//  res.pipe(track);
//});
