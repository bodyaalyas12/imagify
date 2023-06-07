import redirectUnauthorizedToLogin from "@/components/helpers/redirectUnauthorizedToLogin";
import MainPageComponent from "@/components/mainPage/mainPageComponent";

export default async function Page() {
  redirectUnauthorizedToLogin();

  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return <MainPageComponent />;
}
