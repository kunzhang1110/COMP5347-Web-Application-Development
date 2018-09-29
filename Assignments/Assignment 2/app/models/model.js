var mongoose = require('./db.js');
var fs = require('fs');
var request = require('request');
var querystring = require("querystring");


//Revision Model--------------------------------
//define schema for Revision model
var revSchema = new mongoose.Schema(
  {
    revid: Number,
    parentid: Number,
    minor: String,
    user: String,
    anon: String,
    timestamp: String,
 	size: Number,
    sha1: String,
    parsedcomment:String,
    title: String,
    usertype:String
  },
  {
    versionKey: false
  }
);

// *****************************
// OVERVIEW ANALYSIS
// *****************************
revSchema.statics.findExtremumRevision = function(options){
  // find articles with highest/lowest revision
  var pipeline = [
    {
      $group : {
        _id : {title:"$title"},
        count: { $sum:1 }
      }
    },
    { $sort:{ count:parseInt(options.sortDirection) } },
    { $limit: parseInt(options.displayLimit) }
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.findExtremumRegisterUsersGroup = function(options){
  var pipeline = [
    { $match:{usertype:"registered"} },
    {
      $group : {
        _id  : {title:"$title"},
        count: { $sum:1 }
      }
    },
    { $sort:{ count:parseInt(options.sortDirection) } },
    { $limit: 50 }
   ]
  return this.aggregate(pipeline).exec()
}

//find longest/shortest history
revSchema.statics.findExtremumHistory = function(options){
  var pipeline = [
    {
      $group : {
        _id : {title:"$title"},
        firstEditTime: {$min:"$timestamp"},
      }
    },
    { $sort:{ firstEditTime:parseInt(options.sortDirection) } },
    { $limit: parseInt(options.displayLimit) }
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.findUsertypeDistribution = function(){
  var pipeline=[
      {
        $group : {
           _id : {usertype:"$usertype"},
           count: {$sum:1},
        }
      }
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.findUsertypeDistributionByYear = function(){
  var pipeline = [
      {
        $group : {
           _id : {year:{$substr:["$timestamp",0,4]}},
           registered: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "registered" ]},1,0] }
           },
           anonymous: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "anonymous" ]},1,0] }
           },
           admin: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "admin" ]},1,0] }
           },
           bot: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "bot" ]},1,0] }}
           }
        },
        {$sort:{"_id":1}}
   ];
  return this.aggregate(pipeline).exec()
}

// *****************************
// INDIVIDUAL ANALYSIS
// *****************************
revSchema.statics.getAllTitles = function(){
  var pipeline = [
      {
        $group : {
           _id : {title:"$title"},
           count:{$sum:1}
        }
      },
      {$sort:{"_id":1}}
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.getArticleTopUsers = function(options){
  var pipeline = [
       {
           $match:{$and:[{"title":{$eq:options.title}}, {"usertype":{$eq:"registered"}}]}
       },

      {
        $group : {
           _id : {user:"$user"},
           count:{$sum:1}
        }
      },
       {$sort:{"count":-1}},
       {$limit:5}
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.findArticleDistributionYear = function(options){
  var pipeline =   [
      {$match:{"title":options.title}},

      {

        $group : {
           _id : {year:{$substr:["$timestamp",0,4]}},
           registered: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "registered" ]},1,0] }
           },
           anonymous: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "anonymous" ]},1,0] }
           },
           admin: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "admin" ]},1,0] }
           },
           bot: {
                "$sum":{"$cond": [{ "$eq":[ "$usertype", "bot" ]},1,0] }}
           }
        },
            {$sort:{"_id":1}}
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.findArticleDistributionUsertype = function(options){
  var pipeline =    [
    {$match:{"title":options.title}},
    {
        $group : {
           _id : {usertype:"$usertype"},
           count: {$sum:1},
        }
    }
   ]
  return this.aggregate(pipeline).exec()
}

revSchema.statics.findArticleDistributionByUser = function(options){
  var pipeline =    [
       {
           $match:{$and:[{"title":{$eq:options.title}}, {"user":{$eq:options.user}}]}
       },

      {
        $group : {
           _id : {year:{$substr:["$timestamp",0,4]}},
           count:{$sum:1}
        }
      },
       {$sort:{"_id":1}}
   ]
  return this.aggregate(pipeline).exec()
}

// get current last date of the ariticle
revSchema.statics.getAriticleLastDate = function(title){
  var pipeline =     [
    {$match:{"title":title}},
    {$project:{"date":"$timestamp"}},
    {$sort:{"date":-1}},
    {$limit:1}
]
  return this.aggregate(pipeline).exec()
}

//update article
revSchema.statics.updateArticle = function(title,lastDate, callback){
  var wikiEndpoint ="https://en.wikipedia.org/w/api.php";
  var model = this;
  var parameters = [
      "action=query",
      "format=json",
      "prop=revisions",
      "titles="+querystring.escape(title),
      "rvstart="+querystring.escape(lastDate.toISOString()),

     "rvdir=newer", "rvprop="+querystring.escape("timestamp|userid|user|ids"),
      "rvlimit=max"] //query string parameters
  var url = wikiEndpoint + "?" + parameters.join("&"); //construct url
  console.log("send request url:"+url)
  var options = {
    url:url,
    method:'POST',
    json:true,
    Accept: 'application/json',
    headers:{
      'Connection': 'keep-alive',
      'Api-User-Agent': 'Example/1.0'}
  }

  //request revisions from Wikipedia
  request(options,function(err, res, data){
    if (err){
      console.log('Error:', err);
    }else if (res.statusCode !==200){
      console.log('Status:', res.statusCode)
    }else{
      var pages = data.query.pages
      var revisions = pages[Object.keys(pages)[0]].revisions;//get revision objects
      if(revision){
        var updateArray = [];
        for (let i = 0;i<revisions.length;i++){
          var rev = revisions[i];
          if (rev.timestamp.substring(0,19) == lastDate.toISOString().substring(0,19)){//if last date is the most updated
            continue;
          }
          var new_rev = {
           'title':title,
           'user':rev.user,
           'userid':rev.userid,
           'timestamp':rev.timestamp
            }
          updateArray.push(new_rev);

          }
          console.log("Updated length:"+updateArray.length);
          model.insertMany(updateArray,function(err,result){
          if(err){
            console.log("Error:"+err);
          }else
          callback(null,updateArray.length)
        })
      }else{
        callback(null,1)
      }
    }
  })
}


// *****************************
// ARTICLE ANALYSIS
// *****************************
revSchema.statics.findUserAriticle = function(options){
  var pipeline =  [
       {
           $match:{"user":{$regex:options.user}} //match any string contains userinput
       },

      {
        $group : {
           _id : {user:"$user", title:"$title"},
           count:{$sum:1},
           timeStamps:{$addToSet:"$timestamp"}
        }
      },
       {$sort:{"_id":1}}
 ]
  return this.aggregate(pipeline).exec()
}


//define Revision model ------------------------------
var revision = mongoose.model('Revision', revSchema, 'revisions');

//add userType to revision collection
function addUsertypeFromTxt(model, path,type){
  var userArray = [];
  fs.readFileSync(path).toString().split('\n').forEach(line=>{
    userArray.push(line);
  })
  model.updateMany(
    { $and: [{ user:{$in:userArray}}, {usertype:{$exists:false}}]},
    { $set:{"usertype":type}},
    function(err){
      if(err){
        console.error(err)
      }
    }
  )
}

//count these admin&&bot users as admin.
addUsertypeFromTxt(revision, './Admin.txt', "admin")
addUsertypeFromTxt(revision, './Bot.txt', "bot")
revision.updateMany(
    { $and:[{usertype:{$exists:false}},{anon:{$exists:false}}] },
    { $set:{"usertype":"registered"}},
    function(err){
      if(err){
        console.error(err)
      }
    }
  )
revision.updateMany(
    { $and:[{usertype:{$exists:false}},{anon:{$exists:true}}] },
    { $set:{"usertype":"anonymous"}},
    function(err){
      if(err){
        console.error(err)
      }
    }
  )


//*****************************************
//Construct User Model
//*****************************************
// define schema for user model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type:String,
      required:true
    },
    lastname: { // not everyone has a lastname; not required
      type:String,
    },
    emailaddress: {
      type: String,
      trim: true
    },
    username:{
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false
  }
);

// define static methods on user model
userSchema.statics.registerUser = function(registerInfo){
  //create a document for registered users
  var new_user = {
     'firstname':registerInfo.firstname,
     'lastname':registerInfo.lastname,
     'emailaddress':registerInfo.emailaddress,
     'username':registerInfo.username,
     'password':registerInfo.password
  }
  return this.create(new_user) //create a BSON document
}

userSchema.statics.findUser = function(userInput){
  //find the a match for user input
  var userinfo = {
     'username':userInput.username,
     'password':userInput.password
  }
  return this.find(userinfo).exec()
}


var user = mongoose.model('User', userSchema, 'users');
module.exports = {revision, user}
