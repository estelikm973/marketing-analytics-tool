import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "../common/LoadingButton";
import Link from "next/link";

export function SignupForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Fill up the form below to create your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" required />
          </div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <LoadingButton
          defaultText="Create Account"
          loadingText="Creating account..."
        />
        <div className="text-sm text-center text-gray-500 mt-4">
          Already have an account?&nbsp;
          <Link href="/signin">Sign up.</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
