'use client';

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getTask } from "@/lib/actions/task.actions";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const TaskDetails = ({ params }: { params: { taskId: string } }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTaskId = async () => {
      try {
        const resolvedParams = await params;
        
        setTaskId(resolvedParams.taskId);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch task ID.");

      }
    }
    fetchTaskId()

  }, [params]);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      try {
        setIsLoading(true);
        const { success, data } = await getTask(taskId);
        if (success && data) {
          setTask(data);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error("Failed to fetch task.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleUpdate = () => toast.info("Update functionality to be implemented");
  const handleDelete = () => toast.warning("Delete functionality to be implemented");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  if (!task && !isLoading) {
    return <p className="text-center text-gray-500 mt-10">No task found</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center  text-gray-800 px-6"
    >
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">{task?.title}</h1>
        <p className="text-lg mb-4">{task?.description}</p>
        <p className="text-sm opacity-80">Due: {task?.dueDate ? format(new Date(task?.dueDate), "PPP") : "No due date"}</p>
        <p className={`text-lg font-semibold mt-2 ${task?.priority === "HIGH" ? "text-red-300" : "text-green-300"}`}>
          Priority: {task?.priority}
        </p>
        <p className="mt-2 text-lg">Status: {task?.status}</p>
        <div className="flex gap-4 mt-6">
          <Button onClick={handleUpdate} variant="outline" className="flex items-center gap-2 text-gray-600 border-white">
            <Pencil size={16} /> Update
          </Button>
          <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
            <Trash size={16} /> Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskDetails;
