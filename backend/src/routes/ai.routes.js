import express from 'express'
import { auth } from '../middleware/auth.js';
import { getSuggestion } from '../controllers/ai.controller.js';

export const aiRouter = new express.Router;
 
aiRouter.post('/ai/suggestion', auth , getSuggestion)