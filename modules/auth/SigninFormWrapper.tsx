"use client";

import { signin } from "@/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface ISigninFormWrapperProps {
  children: React.ReactNode;
}

const SigninFormWrapper: FC<ISigninFormWrapperProps> = ({ children }) => {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSignin = async (formData: FormData) => {
    setError("");
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const res = await signin(email, password);

    if (res && res.error) {
      setError(error);
    } else {
      router.replace("/");
    }
  };

  return (
    <div>
      {error && (
        <Alert className="bg-red-50 mb-2" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form action={handleSignin}>{children}</form>
    </div>
  );
};

export default SigninFormWrapper;
