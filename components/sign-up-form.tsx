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
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "react-toastify"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      console.log(formData, 'formData')
      const { data, error } = await authClient.signUp.email({
         email: formData.email,
         password: formData.password,
         name: formData.name,
         callbackURL:'/sign-in'
  
}); 
      setIsLoading(false)
      if(error && error.message){
        console.log(error, 'error', data, 'data')
        setError(error.message)
        toast.error(error.message)

      }
      if(data && !error){
        console.log(data, 'data')
        toast.success('Sign Up successful')
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
          <CardTitle className="text-xl">Welcome to Task Manager </CardTitle>
          <CardDescription>
            Signup with your email and password
          </CardDescription>
        </CardHeader>

        <CardContent>
           <div className="flex items-center justify-center">
            {error && <p className="text-red-500"> {error}</p>}
           </div>
          <form  onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  required
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.password}
                   />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading} >
                  {isLoading ? 'loading...' : 'Sign Up'}
                </Button>
              </div>
              <div className="text-center text-sm">
                already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign In
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
