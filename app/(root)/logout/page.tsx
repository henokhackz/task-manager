'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
        },
      });
    };

    signOutUser();
  }, [router]);

  return (
    <div className='h-screen w-full flex items-center justify-center '>
      <p className='font-semibold text-red-600 text-md'>Logging you out...</p>
    </div>
  );
};

export default Logout;
