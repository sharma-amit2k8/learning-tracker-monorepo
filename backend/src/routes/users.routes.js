import express from 'express';
import { User } from '../models/users.model.js'
import { auth } from '../middleware/auth.js';
import { signup, login, getUserProfile , getUserDashboard} from '../controllers/user.controllers.js';
export const router = new express.Router

router.get('/profile', auth ,getUserProfile)

router.post('/signup', signup)

router.post('/login', login)

router.get('/users/dashboard', auth , getUserDashboard)