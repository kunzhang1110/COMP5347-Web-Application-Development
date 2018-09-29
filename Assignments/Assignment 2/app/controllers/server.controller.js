var model = require('../models/model.js');
var MS_PER_DAY = 1000 * 60 * 60 * 24; //milliseconds per day


// render static pages
function showMainPage(req,res){
	res.render("main.pug");
}

function showAnalyticPage(req,res){
  if(req.session.loginStatus==true){ //if authenticated
    res.render("analytic.pug");
  }else{
    res.status(401).send('401 Unauthorized: You need to Login' );//unauthorized
  }
}

// *****************************
// MAIN PAGE
// *****************************
// register users ------------------------------------
function registerUser(req,res){
  let registerStatus = false;
  model.user.registerUser(req.body).then(()=>{
    console.log("Sign Up Successfully");
    registerStatus = true;
  }).catch(err=>{
      console.log(err)
  }).then(()=>{
    res.send({registerStatus:registerStatus})
  })
}

// login user ----------------------------------------
function loginUser(req,res){
  let loginStatus = false;
  model.user.findUser(req.body).then((result)=>{
    if(result.length>0){
      console.log("Login Successfully");
      loginStatus = true;
    }else{
      loginStatus = false;
    }
    req.session.loginStatus = loginStatus;
    console.log(req.session);
    res.send({loginStatus:loginStatus})
  }).catch(err=>{
    console.log(err.message)
    res.send({loginStatus:loginStatus})
  })
}

// *****************************
// OVERVIEW ANALYSIS
// *****************************
// find highest/lowest number of revisions -------------------------
function findExtremumRevision(req,res){
  model.revision.findExtremumRevision(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

// find title of largest/smallest group of registered users
function findExtremumRegisterUsersGroup(req,res){
  model.revision.findExtremumRegisterUsersGroup(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

//find longest/shortest history
function findExtremumHistory(req,res){
  model.revision.findExtremumHistory(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

function findUsertypeDistribution(req,res){
  model.revision.findUsertypeDistribution(req.query).then((result)=>{
    res.send(result);
  }).catch(err=>{
    console.log(err.message);
  });
}

function findUsertypeDistributionByYear(req,res){
  model.revision.findUsertypeDistributionByYear(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

// *****************************
// INDIVIDUAL ANALYSIS
// *****************************
// Individual ------------------------------
function getAllTitles(req,res){
  model.revision.getAllTitles().then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

function getArticleTopUsers(req,res){
  model.revision.getArticleTopUsers(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

function findArticleDistributionYear(req,res){
  model.revision.findArticleDistributionYear(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

function findArticleDistributionUsertype(req,res){
  model.revision.findArticleDistributionUsertype(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

function findArticleDistributionByUser(req,res){
  model.revision.findArticleDistributionByUser(req.query).then((result)=>{
    res.send(result)
  }).catch(err=>{
    console.log(err.message)
  })
}

// *****************************
// ARTICLE ANALYSIS
// *****************************
function findUserAriticle(req,res){
  model.revision.findUserAriticle(req.query).then((result)=>{
    console.log(result)
    res.send(result)
  }).catch(err=>{
    console.log(err.message);
  });
}

function updateArticle(req,res){
  //get the last date of the article
  let title = req.query.title;
  model.revision.getAriticleLastDate(title).then((result)=>{
    let currentDate = new Date();//UTC
    let lastDate = new Date(result[0].date); //UTC
    let diff = Math.floor((currentDate-lastDate)/MS_PER_DAY)
    if (diff>1){ //if the current version is above 1-day old
      model.revision.updateArticle(title, lastDate, function(err, updatedLength){
        res.send({updatedLength:updatedLength})
			})
    }else{// if the current version is less than 1-day old
      res.send({updatedLength:-1})
    }
  }).catch(err=>{
    console.log(err.message)
  })
}


// exports
module.exports = {showMainPage, showAnalyticPage, registerUser, loginUser, findExtremumRevision,findExtremumRegisterUsersGroup, findExtremumHistory, findUsertypeDistribution, findUsertypeDistributionByYear,getAllTitles, getArticleTopUsers,findArticleDistributionYear, findArticleDistributionUsertype, findArticleDistributionByUser, findUserAriticle, updateArticle}
