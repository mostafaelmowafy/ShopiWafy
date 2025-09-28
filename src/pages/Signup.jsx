// import styled from "styled-components";

import LogoAnimation from "../ui/LogoAnimation";
import Heading from "../ui/Heading";
import SignupForm from "../components/authentication/SignupForm";
import CircleAnimation from "../ui/CircleAnimation";

function Signup() {
  return (
    <main className=" overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-900 min-h-screen grid grid-cols-[48rem] justify-center content-center gap-8">
      <CircleAnimation />
      <LogoAnimation />
      <Heading as={"h4"}>Creat new account</Heading>
      <SignupForm />
    </main>
  );
}

export default Signup;
