"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["Low", "Normal", "High", "Critical"]).optional(),
  status: z.enum(["Not Started", "In Progress", "Completed", "On Hold"]).optional(),
})

export function ProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      dueDate: "",
      priority: "Normal",
      status: "Not Started",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
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
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">Create Project</Button>
      </form>
    </Form>
  )
}
