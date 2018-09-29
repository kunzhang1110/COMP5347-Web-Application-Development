var request = require('request');
var wikiEndpoint = "https://en.wikipedia.org/w/api.php",

    parameters = ["action=query",
    "format=json",
    "prop=revisions", "titles=australia", "rvstart=2016-11-01T11:56:22Z", "rvdir=newer",
    "rvlimit=max",
    "rvprop=timestamp|userid|user|ids"]

var url = wikiEndpoint + "?" + parameters.join("&");

console.log("url: " + url)
var options = {
    url: url,
    Accept: 'application/json',
    'Accept-Charset': 'utf-8'
};

request(options, function(err,res, data){
  if(err){
    console.log('Error:', err);
  }else if(res.statusCode != 200){
    console.log('Status:',res.statusCode);
  }else{
    json = JSON.parse(data);
    pages = json.query.pages;
    revisions = pages[Object.keys(pages)[0]].revisions;
  }
  var users=[];
  for (let i =0; i<revisions.length;i++){
    if (!(revisions[i].user in users)){
      users.push(revisions[i].user);
    }    
  }
  console.log(`There are ${users.length} unique users`);
})

