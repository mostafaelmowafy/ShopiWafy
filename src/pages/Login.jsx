import LogoAnimation from "../ui/LogoAnimation";
import Heading from "../ui/Heading";
import CircleAnimation from "../ui/CircleAnimation";
import LoginForm from "../components/authentication/LoginForm";

function Login() {
  return (
    <main className=" overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-900 min-h-screen grid grid-cols-[48rem] justify-center content-center gap-8 p-8">
      <CircleAnimation />
      <LogoAnimation />
      <Heading size="small">Log in to your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
