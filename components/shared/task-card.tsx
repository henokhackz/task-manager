import {Task} from "@prisma/client"
import { useDraggable } from "@dnd-kit/core";


export const TaskCard = ({task}: {task:Task}) => {
    const {attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id
    })
    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      } : undefined
    return (
        <div  className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow" ref={setNodeRef} {...attributes} {...listeners} style={style}>
                      <h3 className="text-md font-semibold text-indigo-800">{task.title}</h3>
                      <p className="text-gray-600 text-sm">{task.description}</p>
                    </div>
    )
}