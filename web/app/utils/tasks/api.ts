import { api } from "../../services/api"
import { CreateTaskRequest, UpdateTaskRequest } from "./types";


export const getAllTasksData = async (userId: string) => {
    const response = await api.get(`tasks/user/${userId}`);
    return response.data;
}

export const getTaskById = async (id: string) => {
    const response = await api.get(`tasks/task/${id}`);
    return response.data;
}

export const createTask = async (taskBody: CreateTaskRequest) => {
    const response = await api.post("tasks/create", taskBody);
    return response.data;
};

export const updateTask = async (id: string, taskBody: UpdateTaskRequest) => {
    const response = await api.put(`tasks/update/${id}`, taskBody);
    return response.data;
};


export const deleteTask = async (id: string) => {
    const response = await api.delete(`tasks/delete/${id}`);
    return response.data;
}



