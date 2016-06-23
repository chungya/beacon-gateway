var Bleacon = require('bleacon');
var req = require('request');

var pidata = {
    pi: 1,
    beacons: []
};

Bleacon.on('discover', function(bleacon) {
    updateBeacon(bleacon);
});

Bleacon.startScanning();

setInterval(function() { 
    pidata.time =  Date.now(); //post time.
    post(pidata);
    pidata.beacons.length = 0; //clear the array
}, 950);

function updateBeacon(beacon) {
    for (var i = 0; i < pidata.beacons.length; i++) {
        if (pidata.beacons[i].uuid === beacon.uuid) {
            pidata.beacons[i] = beacon;
            return;
        }
    }
    pidata.beacons.push(beacon);
}

function post(data) {
    var options = {
        url: "Server URL",
        method: "POST",
        json: true,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.parse(JSON.stringify(data))
    };
    req(options, function(error, response, body) {
        if (error) {
            console.log(error)
        } else {
            console.log(response.statusCode, body)
        }

    });
}

