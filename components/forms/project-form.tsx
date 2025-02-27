"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import {useState} from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { createProject } from "@/lib/actions/project.actions"

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "CRITICAL"]).optional(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ON_HOLD"]).optional(),
})

export function ProjectForm() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const id = data?.user?.id

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      dueDate: "",
      priority: "NORMAL",
      status: "NOT_STARTED",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(id && values && !isPending){
      try{
        setIsSubmitting(true)
        //@ts-expect-error schema error
        const {success, data} =  await createProject(values, id)
        console.log(data, 'data')
        if(success && data){
          toast.success('Project created successfully')
          router.push(`/projects/${data?.id}`)


        }else{
          
          toast.error('Project creation failed')
        }

        setIsSubmitting(false)

      }catch(error){
        toast.error('Project creation failed')
        console.log(data, 'data')
        console.log(error)
        setIsSubmitting(false)
      }
    }

     
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold">Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} className="input w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold ">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Project description" {...field} className="input w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="input w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Priority</FormLabel>
              <FormControl>
                <select {...field} className="input w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Status</FormLabel>
              <FormControl>
                <select {...field} className="input w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                  <option value="NOT_STARTED">Not Started</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="ON_HOLD">On Hold</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">{isSubmitting ? 'Creating...' : 'Create Project'}</Button>
      </form>
    </Form>
  )
}
