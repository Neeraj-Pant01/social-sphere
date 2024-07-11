const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const { addPost, updatePost, likePost, dislikePost, getSinglePost, getAllPosts, getProfilePosts, deletePost } = require("../controllers/post.controller");

//upload a post
router.post('/',verifyToken,addPost)

//update the post
router.put('/',verifyToken, updatePost)

//like the post
router.put('/:id',verifyToken, likePost)

//dislike the post
router.put('/:id',verifyToken, dislikePost)

//get a post
router.get('/:id',verifyToken, getSinglePost)

//get all posts
router.get('/',verifyToken, getAllPosts)

//get user's profile post
router.get('/user/:id',verifyToken, getProfilePosts)

//delete the post
router.delete('/:id', verifyToken, deletePost)

module.exports = router;