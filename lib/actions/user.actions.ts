'use server'



import { prisma } from "@/lib/prisma"




export const getCount = async (ownerId: string) => { 
    try {
        const projectCount = await prisma.project.count(
          {
            where:{
                ownerId
            }
          }
        )
        const taskCount = await prisma.task.count(
            {
                where: {
                    userId: ownerId
                }
            }
        )
        const noteCount = await prisma.note.count(
            {where: {
                userId: ownerId
            }}
        )
        const count = { projectCount, taskCount, noteCount }
        return { success: true, data: count }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}


export const getUserDetails = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        const userDetails = { ...user, password: undefined }
        return { success: true, data: userDetails }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}