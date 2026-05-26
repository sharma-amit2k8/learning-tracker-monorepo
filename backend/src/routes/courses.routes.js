import express from 'express'
import { createCourse, getCourses , updateCourse, deleteCourse, getMyCourses } from '../controllers/courses.controller.js'
import { auth } from '../middleware/auth.js'

export const courseRouter = new express.Router()

courseRouter.post('/course', auth, createCourse)

courseRouter.get('/courses', auth, getCourses)

courseRouter.get('/myCourses' , auth , getMyCourses)

courseRouter.patch('/:id', auth, updateCourse)

courseRouter.delete('/:id', auth , deleteCourse)
