import { Course } from "../models/course.model.js"

export const createCourse = async (req, res) => {
    try {
        console.log('body',req.body)
        const { title, description, price, status, totalLessons,completedLessons } = req.body

        const course = new Course({
            title,
            description,
            price,
            status,
            totalLessons,
            completedLessons,
            createdBy: req.user._id
        })
        
        console.log('course',course )
        const savedCourse = await course.save()
        // console.log('savedCourse',savedCourse)

        res.status(201).json({ 
            message : 'course created successfully',
            savedCourse
         })

    } catch (e) {
        res.status(500).json({
            message : 'Course creation failed',
            eroor : e
        })
    }
}

export const getCourses = async(req,res) => {
    try {

        const minPrice = Number(req.query.minPrice)
        const maxPrice = Number(req.query.maxPrice)

        let filter = {}

        if(minPrice || maxPrice){
            filter.price = {}
        }

        if(minPrice){
            filter.price.$gte = minPrice
        }

        if(maxPrice){
            filter.price.$lte = maxPrice
        }
        // const courses = await Course.find({createdBy : req.user._id})
        const courses = await Course.find(filter).populate('createdBy', 'name email');

        if(!courses) {
            return res.status(404).send('No Courses found')
        }

        res.status(201).json({
            message : 'Courses fetched successfully',
            courses})

    } catch (e) {
        throw new Error('Unable to fetch courses right now, please try after sometime')
    }
}

export const updateCourse = async (req, res) => {
    try {
        // const { id } = req.params
        // const course = await Course.findByIdAndUpdate( req.params.id , req.body, { returnDocument: 'after' })

        const course = await Course.findOneAndUpdate( {_id: req.params.id, createdBy: req.user._id} , req.body, { returnDocument: 'after' })

        if (!course) {
           return res.status(404).json({
            message : 'Course Not Found'
           })
        }

        res.status(200).json({
            message: 'course updated',
            course
        })
    } catch (e) {
        throw new Error('Course update failed')
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id

        const deletedCourse = await Course.findOneAndDelete({ _id: id, createdBy: req.user._id })

        if (!deletedCourse) {
            return res.status(404).send('Course not found')
        }

        res.status(200).send(
            {
                message: 'deleted',
                deleteCourse: deletedCourse
            }
        )
    } catch (e) {
        res.status(400).json({ message: 'Course deletion failed', error: e.message })
    }

}

export const getMyCourses = async (req,res) => {
    try {
        const myCourses = await Course.find({createdBy : req.user._id}).populate('createdBy', 'name')

        const statusOrder = {
            'in progress': 1,
            'not started': 2,
            'completed': 3
        };

        myCourses.sort((a,b)=>  {
            // negative → move up & positive → move down
            return statusOrder[a.status] - statusOrder[b.status]
        })

        if(!myCourses) {
            return res.status(404).json('No Courses found')
        }

        res.status(200).json({
            message : 'Courses Fetched',
            myCourses
        })

    } catch (e) {
        res.status(200).json({
            message : e.message
        })
    }
}


// export const updateCourse = async(req,res) => {
//     try {
//         const id = req.params.id

//         const updatedCourse = await Course.findByIdAndUpdate(id , req.body, {new:true})
 
//         console.log(updatedCourse)

//         res.json({
//           message: 'update done',
//           updatedCourse
//         })

//     } catch (e) {
//         res.json({message : 'update failed' ,error : e.message})
//     }
// }

// // export const updateCourse = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const course = await Course.findByIdAndUpdate(
// //       id,
// //       req.body,
//       { new: true } //tells mongoose to return the new updated document not old one
//     );

//     if (!course) {
//       return res.status(404).json({message: 'Course not found'});
//     }

//     res.json({
//       message: 'Course updated',
//       course
//     });

//   } catch (error) {
//     res.status(500).json({message: error.message });
//   }
// };