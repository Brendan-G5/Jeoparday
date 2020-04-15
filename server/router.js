const router = require('express').Router();

const controller = require('./controllers/controller');

router.get('/questions', controller.getQs);
router.post('/questions', controller.addQs);



module.exports = router;