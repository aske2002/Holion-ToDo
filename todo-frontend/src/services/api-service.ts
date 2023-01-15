import request from "./request-service";
import toDoModel from "../models/toDoModel";
import addToDoModel from "../models/addToDoModel";
import editToDoModel from "../models/editToDoModel";
import crudEnum from "../models/crudEnum";
import { AxiosResponse } from "axios";

const baseUrl: string = "/ToDo";

export const requestDeleteToDo = (id: number): Promise<AxiosResponse<toDoModel, any>> => {
  return request<toDoModel>({}, crudEnum.DELETE, baseUrl + "?ToDoId=" + id)
};

export const requestAddToDo = (model: addToDoModel): Promise<AxiosResponse<toDoModel, any>> => {
    return request<toDoModel>(model, crudEnum.POST, baseUrl)
};

export const requestEditToDo = (model: editToDoModel): Promise<AxiosResponse<toDoModel, any>> => {
    return request<toDoModel>(model, crudEnum.PUT, baseUrl)
};

export const requestGetToDo = (): Promise<AxiosResponse<toDoModel[], any>> => {
  return request<Array<toDoModel>>({}, crudEnum.GET, baseUrl)
};