var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

fs.readFile("BBC.json", function (err, val) {
    if (err) {
        console.error("unable to read file");
    }
    else {
        try {
            val = JSON.parse(val);
            console.log(val);
        }
        catch (e) {
            console.error("invalid json in file");
        }
    }
});

// fs.readFileAsync("BBC.json")
//     .then(JSON.parse)
//     .then(function (val) {
//         console.log(val);
//     })
//     .catch(SyntaxError, function (e) {
//         console.error("invalid json in file");
//     })
//     .catch(function (e) {
//         console.error("unable to read file");
//     });