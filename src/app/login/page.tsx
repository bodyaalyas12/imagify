import LoginComponent from "./login-component";
export default async function Page() {
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return <LoginComponent />;
}
