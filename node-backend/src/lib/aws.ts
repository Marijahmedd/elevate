import { LambdaClient, InvokeCommand, InvocationType } from "@aws-sdk/client-lambda";

export const AWS_CREDENTIALS = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
}

const lambda = new LambdaClient({
    region: "us-east-1",
    credentials: AWS_CREDENTIALS
})

type lambdaInput = Record<string, any>

export async function invokeLambda(input: lambdaInput) {
    const params = {
        FunctionName: "Elevate_ai_score",
        Payload: JSON.stringify(input),
        InvocationType: "Event" as InvocationType
    }
    console.log("lambda invoked with this params", params)
    const command = new InvokeCommand(params)

    try {
        const rawResult = await lambda.send(command)

        const result = new TextDecoder('utf-8').decode(rawResult.Payload)
        console.log("Successfully invoked lamda")
    } catch (error) {
        console.log("Unable to invoke lambda")
    }
}