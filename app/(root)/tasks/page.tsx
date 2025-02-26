'use client'
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getTasks } from "@/lib/actions/task.actions";
import {Task} from '@prisma/client'
import Link from 'next/link'


const TaskDisplay = () => {
  const [filter, setFilter] = useState("ALL");
  const [tasks, setTasks] = useState<Task[] | []>([])

  useEffect(()=>{
    const fetchTasks = async()=>{
      try{    
        const {success, data} = await getTasks()
        console.log(success, data, 'data')
        
        if(success && data){
          setTasks(data)
        }else{
          toast.error('something went wrong please try later or never i dont care ')
        }
      }catch(error){
        console.log(error)
        toast.error('something went wrong ')
      }
    }
    fetchTasks()
  }, [])

  const filteredTasks = filter === "ALL" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex justify-between mb-4">
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter Tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button>Add Task</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 border-l-4 border-blue-500 shadow-md">
              <CardContent>
                <Link href={`/projects/${task.projectId}/tasks/${task.id}`}>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <p className="text-xs mt-2 text-gray-500">Last update: {format(task.updatedAt, "PPP")}</p>
                <p className={`mt-2 text-sm font-medium ${
                  task.priority === "HIGH" ? "text-red-500" : "text-green-500"
                  }`}>Priority: {task.priority}</p>
                  </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskDisplay;
