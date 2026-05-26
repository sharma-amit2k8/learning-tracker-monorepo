import { Task } from "../models/tasks.model.js"

export const createTask = async (req, res) => {
    try {
        const { title , completed } = req.body

        const task = new Task({
            title,
            completed,
            createdBy: req.user._id
        })

        await task.save()

        res.status(201).json({
            message : 'Task created!!!',
            task
        })
    } catch (e) {
        res.status(401).json({
            message : 'Task creation failed XXX',
            error : e.message
        })
    }
}

export const getTasks = async(req,res) => {
    try {
        const tasks = await Task.find({createdBy : req.user._id}).populate('createdBy', 'name email')
        .sort({completed: 1,createdAt : -1})

        if(tasks.length === 0){
            return res.status(200).json({tasks,
            message : 'You dont have any tasks, Please create a tasks first',
        })
        }

        res.status(200).json({
            message : 'Tasks fetched Successfully',
            tasks
        })

    } catch (e) {
        res.status(401).json({
            message : 'Failed to fetch tasks XXX',
            error : e.message
        })
    }
}

export const toggleTaskCompletion = async(req, res) => {
    try {
        console.log('toggle completion called')
        const task = await Task.findOne({_id : req.params.id, createdBy : req.user._id})

        if(!task){
             return res.status(404).json({
                message : 'Task not found'
            })
        }

        task.completed = !task.completed
        await task.save()
        // const completedTask = await Task.findOneAndUpdate( 
        //     {_id : req.params.id, createdBy : req.user._id},
        //     {completed : req.body.completed}, {new : true})

        res.status(201).json({
            message : 'Task status changed',
            task
        })

    } catch (e) {
        res.status(401).json({
            message : 'Task update failed XXX',
            error : e.message
        })
    }
}

export const updateTaskTitle = async(req,res) =>{
    try {
        const task = await Task.findOne({_id : req.params.id, createdBy : req.user._id})

        if(!task){
             return res.status(404).json({
                message : 'Task not found'
            })
        }

        task.title = req.body.title || task.title;

        await task.save()
        // const completedTask = await Task.findOneAndUpdate( 
        //     {_id : req.params.id, createdBy : req.user._id},
        //     {completed : req.body.completed}, {new : true})

        res.status(201).json({
            message : 'Task status changed',
            task
        })

    } catch (e) {
        res.status(401).json({
            message : 'Task update failed XXX',
            error : e.message
        })
    }
}

export const deleteTask = async (req,res) =>{
    try {

        const task = await Task.findOneAndDelete({_id : req.params.id, createdBy :  req.user._id})

        if(!task){
             return res.status(404).json({
                message : 'Task not found'
            })
        }

        res.status(200).json({
            message : 'Task deleted successfully',
            task
        })
    } catch (e) {
        res.status(401).json({
            message : 'Task deletion failed XXX',
            error : e.message
        })
    }
}