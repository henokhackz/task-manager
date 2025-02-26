import { SignUpForm } from "@/components/sign-up-form"
import Image from "next/image"



export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      
      <div className="flex w-full max-w-sm flex-col gap-6">
         <div className='flex items-center justify-center gap-2 '>
              <Image src='/logo.png' height={100} width={100} alt="Logo" className="rounded-full" />
               <h2 className="font-extrabold text-2xl text-indigo-600">Task Manager </h2>
            </div>
        <SignUpForm />
      </div>
    </div>
  )
}
