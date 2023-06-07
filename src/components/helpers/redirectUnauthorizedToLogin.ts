import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function redirectUnauthorizedToLogin() {
  const cookieStore = cookies();
  if (!cookieStore.has("token")) {
    redirect("/login");
  }
}

export default redirectUnauthorizedToLogin;
