import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Project, Task } from "@prisma/client";

type ProjectWithTasks = Project & {
  tasks:Task[]
}


export function ProjectTable({projects}:{projects:ProjectWithTasks[]}) {
  console.log(projects)
  return (
    <div className="overflow-x-auto rounded-xl border shadow-lg p-4 flex flex-col py-4">
                 <div className="flex justify-end items-center w-full">
                    <Link href="/projects/new" className="text-medium font-medium text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition-all duration-300 flex-end">New Project</Link>
                 </div>
      <Table className="min-w-full py-6 px-4">
        <TableCaption className="text-gray-500">A list of your recent projects.</TableCaption>
        <TableHeader>

          <TableRow className=" text-gray-700 rounded-lg">
            <TableHead className="w-1/3 px-4 py-2">Project</TableHead>
            <TableHead className="w-1/3 px-4 py-2">Task</TableHead>
            <TableHead className="w-1/3 px-4 py-2 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <React.Fragment key={project.id} >
             <TableRow className="odd:bg-blue-300/20 even:bg-pink-300/20 hover:bg-gray-300/20  transition-colors duration-300  ">
                <TableCell className="px-4 py-3 font-semibold">
             <Link href={`/projects/${project.id}`} className="w-full">
                  {project.projectName}
             </Link> 
                </TableCell>
                <TableCell colSpan={1} />
                 <TableCell className={clsx("px-4 py-2 text-right", project.status === "NOT_STARTED" && "text-green-600", project.status === "IN_PROGRESS" && "text-yellow-600", project.status === "COMPLETED" && "text-red-600")}>
    <Link href={`/projects/${project.id}`} className="w-full h-full block">
      {project.status}
    </Link>
  </TableCell>
              </TableRow>
              {project?.tasks?.map((task) => (
               <TableRow key={task.title} className="odd:bg-pink-100/20 even:bg-blue-100/20 hover:bg-gray-100/20 transition-colors duration-300 cursor-pointer">
  <TableCell />
  <TableCell className="px-4 py-2 font-medium">
    <Link href={`/projects/${project.id}/tasks/${task.id}`} className="w-full h-full block">
      {task.title}
    </Link>
  </TableCell>
  <TableCell className={clsx("px-4 py-2 text-right text-sm font-light", task.status === "PENDING" && "text-green-600/20", task.status === "IN_PROGRESS" && "text-yellow-600/20", task.status === "COMPLETED" && "text-red-600/20")}>
    <Link href={`/projects/${project.id}/${task.id}`} className="w-full h-full block">
      {task.status}
    </Link>
  </TableCell>
</TableRow>

              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
