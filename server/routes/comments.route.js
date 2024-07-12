const router = require("express").Router();
const { addComment, likeComment, reportAComment, getAllPostcomments, deleteComment } = require("../controllers/comment.controller");
const verifyToken = require("../middlewares/verifyToken");

//add a comment
router.post('/:id',verifyToken, addComment)

//lke the comment
router.put('/:id',verifyToken, likeComment)

//report the comment
router.put('report/:id',verifyToken, reportAComment)

//get all comments
router.get('/:id',verifyToken, getAllPostcomments)

//delete the particular comment
router.delete('/:id', verifyToken, deleteComment)

module.exports = router;