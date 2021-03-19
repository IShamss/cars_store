var express = require('express');
var router = express.Router();
const { postRegister } = require('../controllers/index');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Car - Store' });
});
router.get('/register', (req, res, next) =>{
  res.send('Welcome to the register page')
});
router.post('/register', postRegister);

router.get('/login', (req, res, next) =>{
  res.send('login user')
});
router.post('/login', (req, res, next) =>{
  res.send('post login user')
});
router.get('/profile', (req, res, next) =>{
  res.send('get user profile')
});
//to update user profile like username and password
router.put('/profile/:user_id', (req, res, next) =>{
  res.send('update user profile')
});
//forgot password
router.get('/forgot', (req, res, next) =>{
  res.send('I forgot my password')
});
router.put('/forgot', (req, res, next) =>{
  res.send('I forgot my password update now')
});

router.get('/reset/:token', (req, res, next) =>{
  res.send('reset my password')
});
router.put('/reset/:token', (req, res, next) =>{
  res.send('reset my password put')
});

module.exports = router;
