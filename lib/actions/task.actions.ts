'use server'
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validation/task";
import { revalidatePath } from "next/cache";
import { Task } from "@prisma/client";


export async function createTask(data: z.infer<typeof taskSchema>, projectId: string, userId: string) {
  const validatedData = taskSchema.parse(data);
  console.log(validatedData, 'validatedData')

  if (!userId) {
    return { success: false, data: null , message: "User not found" };
  }

  if(!projectId){
    return { success: false, data: null , message: "Project not found" };
  }
  

  try {
    const task = await prisma.task.create({
      data: {
        title: validatedData.title,
        userId,
        description: validatedData.description,
        status: validatedData.status,
        projectId,
      },
    });
    revalidatePath("/projects/[projectId]");
    return { success: true, data: task };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function getTask(id: string) {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return { success: true, data: task };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function updateTask(id: string, data: z.infer<typeof taskSchema>) {
  const validatedData = taskSchema.parse(data);

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
      },
    });

    return { success: true, data: updatedTask };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function updateTaskStatus(id: string, status: Task["status"]) {

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status,
      },
    });
    revalidatePath("/projects/[projectId]");
    return { success: true, data: updatedTask };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export const getTasks = async ()=>{
  try{
    const tasks = await prisma.task.findMany()
    return {success:true, data:tasks}
  }catch(error){
    console.log(error)
    return {
      success:false,
      data:null
    }
  }
}