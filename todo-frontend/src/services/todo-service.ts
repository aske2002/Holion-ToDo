import { AxiosResponse } from "axios";
import editToDoModel from "../models/editToDoModel";
import toDoModel from "../models/toDoModel";
import * as ApiService from "../services/api-service"

export const addToDo = (todoName: string): Promise<AxiosResponse<toDoModel, any>> => {
    return ApiService.requestAddToDo({ItemName: todoName, IsComplete: false})
}

export const getToDos = (): Promise<AxiosResponse<toDoModel[], any>> => {
    return ApiService.requestGetToDo()
}

export const deleteToDo = (id: number): Promise<AxiosResponse<toDoModel, any>> => {
    return ApiService.requestDeleteToDo(id)
}

export const editToDo = (model: editToDoModel): Promise<AxiosResponse<toDoModel, any>> => {
    return ApiService.requestEditToDo(model)
}