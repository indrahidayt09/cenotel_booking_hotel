import GoogleButton from "@/components/LoginButton/googleButton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect_url?: string }>;
}) => {
  const params = (await searchParams)?.redirect_url;
  let redirectUrl;
  if (!params) {
    redirectUrl = "/";
  } else {
    redirectUrl = `/${params}`;
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-slate-300 w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-semibold mb-1">Sign In</h1>
        <p className="font-medium mb-5 text-slate-500">
          Sig In To Your Account
        </p>
        <div className="flex flex-col gap-4 py-4">
          <GoogleButton redirectUrl={redirectUrl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
