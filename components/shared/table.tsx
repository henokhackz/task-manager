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

const projects = [
  {
    project: "Project 1",
    tasks: [
      { task: "Task 1.1", status: "Completed" },
      { task: "Task 1.2", status: "In Progress" },
      { task: "Task 1.3", status: "Pending" },
    ],
  },
  {
    project: "Project 2",
    tasks: [
      { task: "Task 2.1", status: "Completed" },
      { task: "Task 2.2", status: "In Progress" },
    ],
  },
  {
    project: "Project 3",
    tasks: [{ task: "Task 3.1", status: "Pending" }],
  },
];

export function ProjectTable() {
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
            <React.Fragment key={project.project} >
             <TableRow className="odd:bg-blue-300/20 even:bg-pink-300/20 hover:bg-gray-300/20  transition-colors duration-300  ">
                <TableCell className="px-4 py-3 font-semibold">
             <Link href={`/projects/${project.project}`} className="w-full">
                  {project.project}
             </Link> 
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
              {project.tasks.map((task) => (
               <TableRow key={task.task} className="odd:bg-pink-100/20 even:bg-blue-100/20 hover:bg-gray-100/20 transition-colors duration-300 cursor-pointer">
  <TableCell />
  <TableCell className="px-4 py-2 font-medium">
    <Link href={`/projects/${project.project}/${task.task}`} className="w-full h-full block">
      {task.task}
    </Link>
  </TableCell>
  <TableCell className={clsx("px-4 py-2 text-right", task.status === "Completed" && "text-green-600", task.status === "In Progress" && "text-yellow-600", task.status === "Pending" && "text-red-600")}>
    <Link href={`/projects/${project.project}/${task.task}`} className="w-full h-full block">
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
