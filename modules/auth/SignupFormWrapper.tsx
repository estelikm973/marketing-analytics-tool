"use client";

import { signup } from "@/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ActionStatus } from "@/lib/status";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface ISignupFormWrapperProps {
  children: React.ReactNode;
}

const SignupFormWrapper: FC<ISignupFormWrapperProps> = ({ children }) => {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (formData: FormData) => {
    setErrorMsg("");
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    if (!email || !password || !name) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    const res = await signup({ email, password, name });

    if (res && res.status === ActionStatus.ERROR) {
      setErrorMsg(res.message);
    } else {
      router.replace("/signin");
    }
  };

  return (
    <div>
      {errorMsg && (
        <Alert className="bg-red-50 mb-2" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      <form action={handleSignup}>{children}</form>
    </div>
  );
};

export default SignupFormWrapper;
