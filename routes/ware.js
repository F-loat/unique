var express = require('express')
var router = express.Router()
var Filter = require('../controllers/filter')
var Ware = require('../controllers/ware')
var multer  = require('multer')
var upload = multer({ dest: 'public/upload/img/' })

router.get('/:wareId', Ware.wareInfo)
router.get('/', Ware.waresInfo)
router.post('/', Filter.admin, Ware.addWare)
router.patch('/', Filter.admin, Ware.recoverWare)
router.delete('/', Filter.admin, Ware.delWare)

router.post('/img', Filter.admin, upload.single('file'), Ware.addImg)
router.delete('/img', Filter.admin, Ware.delImg)

router.post('/shopcar/add', Filter.login, Ware.addToShopcar)
router.post('/shopcar/sum', Filter.login, Ware.shopcarSumChange)
router.post('/pay', Filter.login, Ware.pay)
router.post('/pay/again', Filter.login, Ware.buyAgain)
router.post('/pay/succeeded', Ware.paySucceeded)

module.exports = router
