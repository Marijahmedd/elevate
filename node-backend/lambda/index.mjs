import { GoogleGenerativeAI } from "@google/generative-ai";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import pdf from "pdf-parse-new";
import dotenv from "dotenv"


dotenv.config()



const s3 = new S3Client({
region: "us-east-1",
});

export const handler = async (event) => {
  const { applicationId, resumeUrl, jobDescription } = event;
  const Key = `${resumeUrl}.pdf`;
  console.log(event)

  try {
    const res = await s3.send(
      new GetObjectCommand({ Bucket: "elevate-s3-marij", Key })
    );

   // Convert stream to buffer
    const chunks= [];
    for await (const chunk of res.Body ) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // Parse PDF
    const pdfData = await pdf(fileBuffer);
    // console.log(pdfData.text);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = `rate this resume ${pdfData.text} against this Job Description ${jobDescription}, find how suitable this candidate is for the given Job. Rate it from 1-10 and reply only the number with no pre and post text. just reply with the number and nothing else.`;

const result = await model.generateContent(prompt);
const aiScoreOutput= parseInt(result.response.text())
console.log("score" , aiScoreOutput);

    try {
            const payload = {
        applicationId,
        aiScore:aiScoreOutput

      }
      const requestBody  = JSON.stringify(payload)
      const options = {
        method:'PATCH',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${process.env.INTERNAL_TOKEN}`
        },
        body:requestBody
      }
      const backendUrl = `${process.env.BACKEND_URL}/api/webhook/applications` 
      const response = await fetch(backendUrl,options)
       if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
          }
      console.log("Successfully updated aiscore of applicationId ",applicationId)
    } catch (error) {
       console.error('Error:', error);
    }

  } catch (error) {
    console.error( error);
  }
};



// handler({
//   applicationId:"8123fe4b-18ac-426c-9659-ac6cdd3f513d",
//   userId: "bc57c88e-7623-4bd2-8710-5c0dec060d16",
//   jobDescription:" Javascript  developer needed with strong knowledge of cybersecruity and also modern AWS tech"
// });