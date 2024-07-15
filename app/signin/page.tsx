import { SigninForm } from "@/modules/auth/SigninForm";
import SigninFormWrapper from "@/modules/auth/SigninFormWrapper";

const SignIn = async () => {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col">
      <div className="w-full h-screen flex items-start justify-center px-4 pt-[15vh]">
        <div>
          <SigninFormWrapper>
            <SigninForm />
          </SigninFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
