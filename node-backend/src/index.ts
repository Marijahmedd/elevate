import express from "express"
import dotenv from "dotenv"
import { router } from "./routes/router"
import "./lib/aws"
import cors from "cors"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(process.env.PORT, () => console.log("🚀 Listening on ", process.env.PORT))
