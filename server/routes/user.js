const express = require('express');
const router = express.Router();
const { userById, read, update } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

router.param('userId', userById) //ovo koristis da bi dobio jednog usera u ruti ispod

router.get("/secret/:userId", requireSignin, (req, res) => {
    res.json({
        user: req.profile
    })
}) //pored user id moras u header da stavis token Authorization : Bearer token

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)

module.exports = router;
