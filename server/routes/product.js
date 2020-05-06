const express = require('express');
const router = express.Router();


const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get('/products', list)
router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)

router.get('/products/related/:productId', listRelated) //vrati slicne proizvode trenutno selektovanom proizvodu
router.get('/products/categories', listCategories) // daj sve kategorije koje imaju proizvode
router.get("/product/photo/:productId", photo); //daj samo slike posto su velike velicine
// route - make sure its post
router.post("/products/by/search", listBySearch);

router.param('userId', userById)
router.param('productId', productById)



module.exports = router;
