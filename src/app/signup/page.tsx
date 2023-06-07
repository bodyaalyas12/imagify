import SignupComponent from "@/app/signup/signup-component";

export default async function Page() {
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return <SignupComponent />;
}
