import { SignUpForm } from "@/components/sign-up-form"
import { GalleryVerticalEnd } from "lucide-react"



export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-extrabold">
          
         Task Manager
        </a>
        <SignUpForm />
      </div>
    </div>
  )
}
