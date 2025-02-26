'use client'
import { ProjectTable } from '@/components/shared/table'
import React, { useEffect, useState } from 'react'
import { Project as ProjectType, Task } from '@prisma/client'
import { getProjects } from '@/lib/actions/project.actions'
import { toast } from 'react-toastify'

type ProjectWithTasks = ProjectType & {
  tasks:Task[]
}

const Project = () => {

  const [projects, setProjects] = useState<ProjectWithTasks[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  console.log(projects, 'this is projects from project page')

  useEffect(()=>{

    const fetchProjects = async()=>{
     try{
      setIsLoading(true)
      const {success, data} = await getProjects()
      
      if(success && data){
        setProjects(data)
        setIsLoading(false)

      }else{
        toast.error('something went wrong please try later or never i dont care ')
        setIsLoading(false)
      }



    }catch(error){
        console.log(error)
        toast.error('something went wrong ')
    }
    }
    fetchProjects()
  }, [])


  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
       {
        isLoading &&  <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
       }
       {
        projects && !isLoading && <ProjectTable projects={projects}/>
       }
               
              </div>
  )
}

export default Project
