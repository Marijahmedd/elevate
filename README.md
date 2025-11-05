**Elevate**
**AI-powered hiring platform**

Elevate is a modern job board that intelligently connects recruiters and job seekers.
It uses Google OAuth for authentication, PostgreSQL for data storage, and AWS Lambda + Gemini API for AI-based application scoring.

**Architecture**
<img width="1164" height="552" alt="Elevate Architecture" src="https://github.com/user-attachments/assets/af6fd4ea-3cb6-46f7-a321-552ebbef8be8" />


**Core Components**

Frontend: React app hosted on Amazon S3, served globally via CloudFront.

Backend: Node.js (Express) API deployed on EC2.

Database: PostgreSQL (RDS) with pgvector for semantic search support.

Async Jobs: AWS Lambda (Node.js) handles resume parsing and AI scoring via Gemini API.

File Storage: Amazon S3 for resumes and organization images using pre-signed URLs.

Network: EC2 and RDS inside a VPC; CloudFront serves the static frontend from S3.

**Design Decisions**

- **Google OAuth + JWT**

Stateless authentication enables horizontal scaling without sticky sessions.

- **CloudFront over raw S3**

CloudFront caches assets at the edge, improving latency and reducing S3 data transfer cost.

- **Pre-signed S3 URLs**

File uploads go directly from the browser to S3 bypassing backend using secure, short-lived pre-signed URLs.

This offloads heavy upload traffic from the backend.

- **PostgreSQL**

One of many Reasons to use Postgresql in here is the ability to use extensions, specifically PGVECTOR. Which will be used to store vector embeddings of jobs. To fetch sementically similar jobs in our AI search feature. 

- **Asynchronous Lambda**

Used lambda in async/event mode. When a user applies for a job. Job application event lambda is triggered. This lambda is non-blocking and creates the job Application without waiting for response from lambda which can take some time in parsing resume and generating AI score.

- **Internal Webhook Token**

Lambda calls back the backend with an internal secret token to update job application scores securely.

**Workflow**

- **File Upload**

  Frontend requests a pre-signed URL from the backend.

  User uploads resume or image directly to S3 using that URL.

- **Job Application**

  Application metadata (S3 file key, job ID, user info) is submitted to the backend. Lambda is invoked in event mode to generate AI score while the rest of the data is
  pushed to the DB.

- **Async Processing**

  Backend triggers a Lambda function with job and resume details.

- **Lambda Actions**

- Fetches the resume from S3.

- Sends it to the Gemini API for AI scoring.

- Calls a backend webhook with the score and internal token.

**Backend Update**

- Verifies token and updates the job application record in PostgreSQL.

**Core Features**

**Recruiter**

- Create organization profiles and manage job posts.

- View AI-generated job application scores.

- (Planned) AI-generated summaries for candidate resumes.

**Job Seeker**

- Register, upload, and update resumes securely via pre-signed URLs.

- Apply to jobs directly.

- (Planned) AI-powered job search using vector embeddings.

**Tech Stack**

Frontend: React, Tailwind CSS, Shadcn, Tanstack Query, MUI.

Backend:	Express, NodeJs, Prisma ORM

Database	PostgreSQL (RDS)

Async Jobs: AWS Lambda (Node.js)

Authentication:	Google OAuth 2.0 + JWT

AI:	Gemini API

File Storage:	Amazon S3 + Pre-signed URLs

Infrastructure:	AWS (EC2, RDS, Lambda, CloudFront, S3, IAM)

**Planned Enhancements**

- AI resume summaries for recruiters.

- Semantic job search using embeddings + pgvector.

- CI/CD with Terraform + GitHub Actions.

