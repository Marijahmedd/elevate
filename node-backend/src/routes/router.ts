import { Router } from "express"
import { authenticatedReq } from "../lib/auth-middleware"
import { GoogleLogin } from "../controllers/auth.controller"
import { applyForJob, generatePresignedUrlResume, registerAsRecruiter, updateResume } from "../controllers/user.controller"
import { getJobDetails, getPostedJobs, postJob } from "../controllers/recruiter.controller"
import { recruiterRequest } from "../lib/recruiter-middleware"
import { getPublicJobDetails, getPublicJobs } from "../controllers/public.controller"

export const router = Router()

//unprotected
router.post("/login", GoogleLogin)
router.get("/jobs", getPublicJobs)
router.get("/jobs/:id", getPublicJobDetails)


//Protected for users
router.post("/recruiters", authenticatedReq, registerAsRecruiter)
router.get("/presigned-url", authenticatedReq, generatePresignedUrlResume)
router.post("/users/resume", authenticatedReq, updateResume)
router.post("/applications", authenticatedReq, applyForJob)


//Protected for recruiters
router.get("/recruiter/jobs", authenticatedReq, recruiterRequest, getPostedJobs)
router.post("/recruiter/jobs", authenticatedReq, recruiterRequest, postJob)
router.get("/recruiter/jobs/:id", authenticatedReq, recruiterRequest, getJobDetails)




router.post("/protected", authenticatedReq, (req, res) => {

    res.send("On a protected Route")
})

