import { Router } from "express"
import { authenticatedReq } from "./lib/auth-middleware"

export const router = Router()


router.post("/auth", authenticatedReq, (req, res) => {
    console.log("Server is running")

    res.send("Server is running")
})
