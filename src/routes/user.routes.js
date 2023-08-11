// import { Router } from "express"
// import userFunc from "../controllers/user"
const { Schema, model } = require('mongoose')
const { Router } = require("express")
const { createTicket, test, eatTicket,getInfo } = require("../controllers/user")

const router = Router()


router.get('/', test)
router.post('/createTicket', createTicket)
router.post('/eatTicket', eatTicket)
router.get('/getInfo', getInfo)


// export default router
module.exports = router
