import { FaGoogle } from "react-icons/fa6";
import { signIn } from "@/auth";

const GoogleButton = ({ redirectUrl }: { redirectUrl: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: redirectUrl });
      }}
    >
      <button className="flex items-center justify-center gap-2 w-full bg-blue-500 text-slate-200 font-medium py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer">
        <FaGoogle /> Sign In With Google
      </button>
    </form>
  );
};

export default GoogleButton;
