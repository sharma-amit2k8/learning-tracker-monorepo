import jwt from 'jsonwebtoken'
import { User } from '../models/users.model.js'

export const auth = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            return res.status(400).json('Not Authorized, Please provide token')
        }

        const token = req.headers.authorization.replace('Bearer ', "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(400).json('Invalid Token')
        }

        req.user = user
        next()
    }
    catch (e) {
        res.status(400).json('Invalid Token')
    }
}
