import { SignupForm } from "@/modules/auth/SignupForm";
import SignupFormWrapper from "@/modules/auth/SignupFormWrapper";

const SignUp = async () => {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col">
      <div className="w-full h-screen flex items-start justify-center px-4 pt-[15vh]">
        <div>
          <SignupFormWrapper>
            <SignupForm />
          </SignupFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
