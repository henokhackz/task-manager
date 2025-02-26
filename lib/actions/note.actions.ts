'use server'
import { prisma } from "@/lib/prisma"
import { noteSchema } from "@/lib/validation/note"
import z from "zod"
import { revalidatePath } from "next/cache"

export const getNotes = async () => {
    try {
        const notes = await prisma.note.findMany()
        return { success: true, data: notes }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}

export const createNote = async (data: z.infer<typeof noteSchema>, userId: string) => {
    const validatedData = noteSchema.parse(data)
    
    try {
        const note = await prisma.note.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                userId
            },
        })
        console.log(note, 'note')
        revalidatePath('/notes')
        return { success: true, data: note }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}

export const deleteNote = async (id: string) => {
    try {
        await prisma.note.delete({ where: { id } })
        revalidatePath('/notes')
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false }
    }
}

export const updateNote = async (id: string, data: z.infer<typeof noteSchema>) => {
    const validatedData = noteSchema.parse(data)
    try {
        const note = await prisma.note.update({
            where: { id },
            data: {
                title: validatedData.title,
                content: validatedData.content,
            },
        })
        return { success: true, data: note }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}


export const getLatestNote = async () => {
    try {
        const note = await prisma.note.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        })
        return { success: true, data: note }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}


export const getNoteById = async (id: string) => {
    try {
        const note = await prisma.note.findUnique({ where: { id } })
        return { success: true, data: note }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}