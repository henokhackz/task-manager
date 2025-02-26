"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { createTask } from "@/lib/actions/task.actions";
import {useUserId} from "@/hooks/useUser"; 
import {taskSchema} from "@/lib/validation/task"
import {useRouter} from "next/navigation"



type TaskFormValues = z.infer<typeof taskSchema>;

export function TaskForm({ projectId, onTaskCreated }: { projectId: string; onTaskCreated?: () => void }) {
  const [loading, setLoading] = useState(false);
  const {userId, isPending} = useUserId()
  const router = useRouter()
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormValues) => {
    setLoading(true);
    try {
      if(isPending || !userId){
        return
      }
      const response = await createTask(data, projectId , userId);
      console.log(response, "response");

      if (response.success) {
        toast.success("Task created successfully!");
        reset(); 
        onTaskCreated?.();
       
        router.push(`/projects/${projectId}`)

      } else {
        toast.error( "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter task title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter task description"
            rows={3}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Task Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Task..." : "Create Task"}
        </Button>
      </form>
    </div>
  );
}
