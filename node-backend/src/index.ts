import express from "express"
import dotenv from "dotenv"
import { router } from "./routes/router"
import "./lib/aws"
import cors from "cors"
import { prisma } from "./lib/prisma"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', router)


async function startServer() {
    try {
        await prisma.$connect();
        console.log("✅ Database connection successful");

        app.listen(process.env.PORT, () => console.log("🚀 Listening on ", process.env.PORT))

    } catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    }
}

startServer();


