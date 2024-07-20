const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = require("express").Router();


router.post('/signup',registerUser);
router.post('/signin',loginUser);

//login with google


module.exports = router;