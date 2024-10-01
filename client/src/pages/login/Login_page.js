import SocialLogin from "./SocialLogin";
import InputField from "./InputField";
import './login.css'
import { Link } from "react-router-dom";

const Login_page = () => {
  return (
    <div className="bodySec">
            <div className="login-container">
                <h2 className="form-title">Log in with</h2>
                <SocialLogin />
                <p className="separator"><span>or</span></p>
                <form action="#" className="login-form">
                    <InputField type="email" placeholder="Email address" icon="mail" />
                    <InputField type="password" placeholder="Password" icon="lock" />
                    <a href="#" className="forgot-password-link">Forgot password?</a>
                    <Link to="/">
                        <button type="submit" className="login-button">Log In</button>
                    </Link>
                </form>
                <p className="signup-prompt">
                    Don&apos;t have an account? <a href="#" className="signup-link">Sign up</a>
                </p>
            </div>
    </div>
  )
}
export default Login_page;