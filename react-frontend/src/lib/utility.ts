export const capitalizeFirst = (input: string) => {
    return (input[0].toUpperCase() + input.slice(1))
}


export const convertIntoK = (input: number): string => {
    if (input.toString().length > 3) {
        const stringInput = input.toString()
        const trimmed = stringInput.slice(0, stringInput.length - 3)
        return (trimmed + `K`)
    }
    return input.toString()

}

export const keyToS3Url = (key: string) => {
    const bucketUrl = import.meta.env.VITE_S3_BUCKET_URL
    return `${bucketUrl}/${key}`
}