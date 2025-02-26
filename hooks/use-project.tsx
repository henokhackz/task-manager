 'use client'
 import {useState, useEffect} from 'react'
import { Project, Task } from '@prisma/client'
import { getProjects } from '@/lib/actions/project.actions'
import { toast } from 'react-toastify'

type ProjectWithTasks = Project & {
  tasks:Task[]
}


 export const useProject = ()=>{
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


      }else{
        toast.error('something went wrong please try later or never i dont care ')
      }

      setIsLoading(false)


    }catch(error){
        console.log(error)
        toast.error('something went wrong ')
        setIsLoading(false)
    }
    }
    fetchProjects()
  }, [])


    return {
        projects,
        isLoading
    }
 }
 
 
 
 
 
  