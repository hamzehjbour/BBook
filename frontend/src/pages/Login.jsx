import LoginForm from "../features/authentication/LoginForm";
import LoginLayout from "../ui/LoginLayout";
import StyledH1 from "../ui/StyledH1";

function Login() {
  return (
    <LoginLayout>
      <StyledH1>Welcome back</StyledH1>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
