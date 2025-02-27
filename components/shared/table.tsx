import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { Project, Task } from "@prisma/client";
import { motion } from "framer-motion";

type ProjectWithTasks = Project & {
  tasks: Task[];
};

export function ProjectTable({ projects }: { projects: ProjectWithTasks[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Card */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-between items-start">
              <h3 className="text-2xl font-semibold text-indigo-900 uppercase ">{project.projectName}</h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-sm font-extralight",
                  project.status === "NOT_STARTED" && "bg-green-100 text-green-600",
                  project.status === "IN_PROGRESS" && "bg-yellow-100 text-yellow-600",
                  project.status === "COMPLETED" && "bg-red-100 text-red-600"
                )}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>

          {/* Task List under Project */}
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Tasks:</h4>
            <div className="space-y-2">
              {project?.tasks?.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col justify-center items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <Link
                    href={`/projects/${project.id}/tasks/${task.id}`}
                    className="text-sm font-medium text-indigo-800 hover:text-indigo-600 capitalize"
                  >
                    {task.title}
                  </Link>
                  <span
                    className={clsx(
                      "px-3 py-1 text-xs rounded-full font-medium",
                      task.status === "PENDING" && "bg-green-100 text-green-600",
                      task.status === "IN_PROGRESS" && "bg-yellow-100 text-yellow-600",
                      task.status === "COMPLETED" && "bg-red-100 text-red-600"
                    )}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Link
              href={`/projects/${project.id}`}
              className="text-indigo-600 hover:underline text-sm"
            >
              View Project Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
