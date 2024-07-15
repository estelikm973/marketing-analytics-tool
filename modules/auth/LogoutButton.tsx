import { logout } from "@/actions/auth";
import LoadingButton from "../common/LoadingButton";

export async function LogoutButton() {
  return (
    <form action={logout}>
      <LoadingButton
        defaultText="Sign Out"
        loadingText="Signing Out..."
      ></LoadingButton>
    </form>
  );
}
