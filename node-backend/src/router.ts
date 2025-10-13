import { Router } from "express"
import { authenticatedReq } from "./lib/auth-middleware"
import { GoogleLogin } from "./controllers/auth.controller"

export const router = Router()




router.post("/login", GoogleLogin)




router.post("/protected", authenticatedReq, (req, res) => {

    res.send("On a protected Route")
})