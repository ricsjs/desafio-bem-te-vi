import { z } from "zod";

export interface CreateTaskRequest {
    userId: string;
    name: string;
    description: string;
}

export const createTaskSchema = z.object({
    userId: z.string(),
    name: z.string(),
    description: z.string(),
})

export interface UpdateTaskRequest {
    name: string;
    description: string;
    status: string;
    userId: string; 
}

export const updateTaskSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    userId: z.string(),
})