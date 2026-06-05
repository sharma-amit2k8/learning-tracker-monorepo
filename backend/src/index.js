import express from 'express';
import { router } from './routes/users.routes.js';
import { courseRouter } from './routes/courses.routes.js';
import { tasksRouter} from './routes/tasks.routes.js'
import { connectDB } from './db/mongoose.js';
import dotenv from 'dotenv/config';
import { errorHandler } from './middleware/error.middleware.js';
import { aiRouter } from './routes/ai.routes.js';
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json())

app.use(router)
app.use(courseRouter)
app.use(tasksRouter)
app.use(aiRouter)

app.use(errorHandler)

await connectDB()

const port = process.env.PORT ||  3000

app.listen(port, ()=> {
    console.log(`app started on ${port}`)
})