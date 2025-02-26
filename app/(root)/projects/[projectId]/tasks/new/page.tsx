'use client'
import React, { useEffect, useState } from 'react'
import {TaskForm} from "@/components/forms/task-form"
const NewTask = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(projectId, 'projectId ye s it is from here ')
  useEffect(() => {

      const fetchParams = async () => {
        setIsLoading(true);
        const resolvedParams = await params;
        setProjectId(resolvedParams.projectId);
        setIsLoading(false);
      };
  
      fetchParams();
    }, [params]);

    if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
  
  return (
    <div className='min-h-screen px-4 py-6  '>
      {projectId ? <TaskForm projectId={projectId}  /> : <div>Loading...</div>}
    </div>
  )
}

export default NewTask
