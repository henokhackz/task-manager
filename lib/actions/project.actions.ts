'use server'

import { z } from "zod"


import { prisma } from "@/lib/prisma"
import { projectSchema } from "@/lib/validation/project"

export async function createProject(data: z.infer<typeof projectSchema>,ownerId:string) {
  const validatedData = projectSchema.parse(data)
  

  
  try{
        const project = await prisma.project.create({
        data: {
            projectName: validatedData.projectName,
            description: validatedData.description,
            dueDate: validatedData.dueDate,
            priority: validatedData.priority,
            status: validatedData.status,
            owner: {
            connect: {
                id: ownerId,
            },
            },
        },
        })
       console.log(project, 'project')
        return {
        success: true,
        data: project,
        
        }
  }catch(error){
    console.log(error, 'error')
    return {
      success: false,
      data: null
    }
  }
}

export const getProject = async (id: string) => {
  console.log(id, 'id from get project')
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include:{
        tasks:true
      },
    })
    return {
      success: true,
      data: project,
    }
  } catch (error) {
    console.error("Error fetching project:", error)
    return {
      success: false,
      data: null,
    }
  }
}


export const getProjects = async ()=>{

  try {
    const projects = await prisma.project.findMany(
    {
      include:{
        tasks:true
      }
    }
  )
  return {
    success:true,
    data:projects

  }
  } catch (error) {
    console.log(error)
    return {
      success:false,
      data:null
    }
    
  }

  

}