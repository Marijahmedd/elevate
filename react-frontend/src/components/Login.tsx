import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

const Login = () => {
    const responseMessage = (response: CredentialResponse) => {
        console.log(response.credential);
    };
    const errorMessage = () => {
        console.log("error");
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

        </div>
    )
}
export default Login