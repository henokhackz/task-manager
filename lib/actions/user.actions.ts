'use server'

import { z } from "zod"


import { prisma } from "@/lib/prisma"
import { projectSchema } from "@/lib/validation/project"

export async function createProject(data: z.infer<typeof projectSchema>,ownerId:string) {
  const validatedData = projectSchema.parse(data)
  return prisma.project.create({
    data: {
      ...validatedData,
      owner: { connect: { id: ownerId } },
    }

    
  })
}

export async function getProjects() {
  return prisma.project.findMany({
    include: { tasks: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  })
}

export async function updateProject(id: string, data: z.infer<typeof projectSchema>) {
  const validatedData = projectSchema.parse(data)
  return prisma.project.update({
    where: { id },
    data: validatedData,
  })
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  })
}
