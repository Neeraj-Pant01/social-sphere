const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken")
const {editUser, getUser, getUsers, getFollowers, getTheFollowings, followUser, unfollowUser} = require("../controllers/user.controller");

router.put('/:id',verifyToken,editUser)
router.get('/:id', verifyToken, getUser)
router.get('/', verifyToken, getUsers)
router.get('/fanslist/:id',verifyToken,getFollowers)
router.get('/followinglist/:id', verifyToken, getTheFollowings)
router.put('/follow/:id', verifyToken, followUser)
router.put('/unfollow/:id', verifyToken, unfollowUser)

module.exports = router;