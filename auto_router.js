import { Router } from "express";
import  controller  from "./auth_controller.js";
const router = new Router()

router.post('/registration', controller.registration )
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

export default router;