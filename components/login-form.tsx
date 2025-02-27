'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "react-toastify"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Loader2 } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
   
    
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      console.log(formData, 'formData')
      const { data, error } = await authClient.signIn.email({
         email: formData.email,
         password: formData.password,
         callbackURL:'/dashboard'
  
}); 
      setIsLoading(false)
      if(error && error.message){
        console.log(error, 'error', data, 'data')
        setError(error.message)
        toast.error(error.message)

      }
      if(data && !error){
        console.log(data, 'data')
        toast.success('Sign In successful')
      }
    } catch (error) {
      setIsLoading(false)
      setError(error instanceof Error ? error.message : "Something went wrong")
      toast.error(error instanceof Error ? error.message : "Something went wrong")
      
    }

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  {error&& <p className='text-red-500'>{error}</p>}
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    name='email'
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required onChange={handleChange} value={formData.password} name='password'/>
                </div>
                <Button type="submit" disabled={isLoading} className='bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700 duration-3000 transition-colors '>
                  {isLoading ? <Loader2 className="mx-2 animate-spin duration-300 transition-all "/>: "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
