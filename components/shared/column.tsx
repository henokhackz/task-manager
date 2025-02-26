import { useDroppable } from "@dnd-kit/core";
import { Project, Task } from "@prisma/client";
import Link from "next/link";
import { TaskCard } from "./task-card";


type ColumnProps = {
  id: string;
  label: string;
  tasks: Task[];
};



export const Column = ({column, project}: {column: ColumnProps, project:Project}) => {
  const {setNodeRef} = useDroppable({
    id: column.id
  })
  return (

<div  className="flex flex-col bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-center text-indigo-600 mb-4">{column.label}</h2>
              
              <div className="space-y-4 " ref={setNodeRef}>
                
                {/* horzontal break line*/}
                <div className="h-px bg-gray-200 "></div>
                {column.tasks.length > 0 ? (
                  column.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No tasks in this status</p>
                )}
              </div>
                { column.id === "PENDING" && <Link href={`/projects/${project.id}/tasks/new`} className='text-smfont-medium text-white py-2 px-4 rounded-lg transition-all duration-300 flex-end cursor-pointer hover:bg-indigo-600 hover:text-white mt-6 bg-indigo-500 '>create new task</Link>}
            </div>
  )
}