const questionsController = require('./controllers/questionsController.js');
const videosController = require('./controllers/videosController.js');
const homeController = require('./controllers/homeController.js');
const authController =require('./controllers/authController.js');
const router = require('express').Router();

router.get('/api/questions', questionsController.getQuestions);
router.post('/api/questions', questionsController.createQuestion);

router.get('/api/presigned', videosController.generatePreSignedUrl);
router.get('/api/videos', videosController.getVideo);
router.post('/api/videos', videosController.createVideo);

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);

// Send homepage when users route to videos or record endpoint
// React Router will handle showing the appropriate views
router.get('/videos/*', homeController.sendHome);
router.get('/record', homeController.sendHome);
router.get('/login', homeController.sendHome);
router.get('/signup', homeController.sendHome);
router.get('/gif', homeController.sendHome);

// TODO
// Handle unknown routes;
// router.get(*, errorHandler);

router.get('/profile', homeController.sendHome);

module.exports = router;
