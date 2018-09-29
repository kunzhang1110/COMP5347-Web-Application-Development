var express = require('express')
var controller = require('../controllers/server.controller.js')
var router = express.Router()
// main page routes

router.get('/', controller.showMainPage);
router.post('/login', controller.loginUser);
router.post('/signup', controller.registerUser);


// analytic page routes
router.get('/analytic', controller.showAnalyticPage);
router.get('/analytic/findExtremumRevision', controller.findExtremumRevision);
router.get('/analytic/findExtremumRegisterUsersGroup', controller.findExtremumRegisterUsersGroup);
router.get('/analytic/findExtremumHistory', controller.findExtremumHistory);
router.get('/analytic/findUsertypeDistribution', controller.findUsertypeDistribution);
router.get('/analytic/findUsertypeDistributionByYear', controller.findUsertypeDistributionByYear);
router.get('/analytic/getAllTitles', controller.getAllTitles);
router.get('/analytic/getArticleTopUsers', controller.getArticleTopUsers);
router.get('/analytic/findArticleDistributionYear', controller.findArticleDistributionYear);
router.get('/analytic/findArticleDistributionUsertype', controller.findArticleDistributionUsertype);
router.get('/analytic/findArticleDistributionByUser', controller.findArticleDistributionByUser);
router.get('/analytic/findUserAriticle', controller.findUserAriticle);
router.get('/analytic/updateArticle', controller.updateArticle);



module.exports = router;
