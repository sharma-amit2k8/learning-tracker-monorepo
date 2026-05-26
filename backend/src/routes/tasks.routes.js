import express from "express";
import { auth } from "../middleware/auth.js";
import { createTask, getTasks, toggleTaskCompletion, updateTaskTitle, deleteTask } from "../controllers/tasks.controller.js";

export const tasksRouter = new express.Router()

tasksRouter.post('/task', auth, createTask)
tasksRouter.get('/tasks', auth, getTasks)
tasksRouter.patch('/task/:id/complete', auth , toggleTaskCompletion)
tasksRouter.patch('/task/:id', auth , updateTaskTitle)
tasksRouter.delete('/task/:id', auth , deleteTask)