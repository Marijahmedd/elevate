import { Router } from "express"
import { authenticatedReq } from "../lib/auth-middleware"
import { GoogleLogin } from "../controllers/auth.controller"
import { applyForJob, generateImagePresignedUrl, generatePresignedUrlResume, isAppliedForJob, registerAsRecruiter, updateResume } from "../controllers/user.controller"
import { getJobDetails, getPostedJobs, postJob, updateApplicationStatus } from "../controllers/recruiter.controller"
import { recruiterRequest } from "../lib/recruiter-middleware"
import { getPublicJobDetails, getPublicJobs } from "../controllers/public.controller"
import { updateAiScore } from "../controllers/webhook"
import { generatePresignedUrlImage } from "../lib/presigned-url"

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
router.get("/jobs/:id/status", authenticatedReq, isAppliedForJob)
router.get("/image-presigned-url", authenticatedReq, generateImagePresignedUrl)


//Protected for recruiters
router.get("/recruiter/jobs", authenticatedReq, recruiterRequest, getPostedJobs)
router.post("/recruiter/jobs", authenticatedReq, recruiterRequest, postJob)
router.get("/recruiter/jobs/:id", authenticatedReq, recruiterRequest, getJobDetails)
router.post("/recruiter/applications/status", authenticatedReq, recruiterRequest, updateApplicationStatus)





//Protected
router.patch("/webhook/applications", updateAiScore)

router.post("/protected", authenticatedReq, (req, res) => {

    res.send("On a protected Route")
})

