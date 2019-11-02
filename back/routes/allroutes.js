const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const public_post_controller = require('../controllers/PostController');
const private_post_controller = require('../controllers/PrivatePostController');
const user_controller = require('../controllers/UserController');

//PUBLIC ROUTES
//list of all posts
router.get('/posts/all', public_post_controller.posts_all_GET);

//comment on a post
router.post('/posts/:id', public_post_controller.posts_postId_POST);

//read a post
router.get('/posts/:id', public_post_controller.posts_postId_GET);


//PRIVATE ROUTES
//11 Get all post titles (including info about published/unpublished)
router.get('/posts/private/all', private_post_controller.posts_private_all_GET);

//5 Delete a post
router.delete('/posts/private/:id', private_post_controller.posts_private_postId_DELETE);

//6 Change post from upublished to published or vice versa
router.put('/posts/private/:bool/:id', private_post_controller.posts_private_postId_PUT);

//9 Edit an existing post
router.put('/posts/private', private_post_controller.posts_private_PUT);

//10 Create a brand new post
router.post('/test/posts/private', private_post_controller.posts_private_POST);

//LOGIN ROUTE
router.get('/login', user_controller.login_GET);
router.post('/login', user_controller.login_POST);

//LOGOUT ROUTE
router.get('/logout', user_controller.logout_GET);

module.exports = router;







