'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getProject } from "@/lib/actions/project.actions";

import { Project , Task} from "@prisma/client";
import {DragEndEvent, DndContext} from "@dnd-kit/core";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateTaskStatus } from "@/lib/actions/task.actions";
import {Column} from "@/components/shared/column";
import { ArrowLeft, ChevronDown } from "lucide-react";


const COLUMNS: { id: string; label: string }[] = [
  { id: "PENDING", label: "Pending" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "COMPLETED", label: "Completed" },
  { id: "Archived", label: "Archived" },
];



export default function ProjectDetails({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data} = authClient.useSession();
  const userId = data?.user?.id;
  const router = useRouter();

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.projectId);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (userId && projectId) {
      console.log(projectId, 'projectId')
      const fetchProject = async () => {
        try {
          const { success, data } = await getProject(projectId);
          console.log(data, 'data')
          if (success && data) {
            setProject(data);
            setTasks(data?.tasks || []); 
          } else {
            toast.error("Failed to load project");
          }
        } catch (error) {
          console.error("Error fetching project:", error);
          toast.error("Failed to load project");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProject();
    }
  }, [userId, projectId, router]);



  async function handleDragEnd(e:DragEndEvent){
    const {over, active} = e;
    if(!over) return 
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    try {

     const {success, data} = await updateTaskStatus(taskId, newStatus);
     console.log(data, 'data', success, 'success')
     if(success && data){
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        })
      );
     }
    } catch (error) {
      toast.error("Failed to update task status");
      console.error(error);
    }
    

    
  }

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
  
  if (!project) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-gray-600">Project not found</p>
    </div>
  );

  // Group tasks by status
  const groupedTasks = COLUMNS.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.id),
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 ">{project.projectName}</h1>
        
        <div className="flex justify-end gap-4 mb-6">
          <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center justify-center px-2 rounded-lg shadow-sm'><p className="text-medium font-sm text-gray-800 py-2 px-4 rounded-lg transition-all duration-300 flex-end">edit project</p> <ChevronDown className='ml-2' size={20} /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>project</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>update project</DropdownMenuItem>
        <DropdownMenuItem>new task</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:text-red-600">delete</DropdownMenuItem>
      </DropdownMenuContent>  
</DropdownMenu>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <DndContext onDragEnd={handleDragEnd}>
          {groupedTasks.map((column) => (
            <Column key={column.id} column={column} project={project} />
          ))}
          </DndContext>
        </div>

        <Button onClick={() => router.push("/projects")} className="mt-8" variant="outline"> <ArrowLeft size={20} className="ml-2"/> Go Back </Button>
      </div>
    </div>
  );
}
