import {  Request, Response } from "express";
import Users from "../models/userSchema";
import { ErrorWithStatusCode } from "../service/types";
import { Error } from "mongoose";
import { CUSTOM_ERRORS } from "service/constants";


class UserController {
    async newUser (req: Request, res: Response) {
        try {
            const {name, about, avatar} = req.body
            const user =  await Users.create({name, about, avatar})
            res.status(200).json(user)
        }
        catch(error) {
            const mongooseError = error as Error.ValidationError
            if (mongooseError?.name === CUSTOM_ERRORS.VALIDATION_ERROR) {
                res.status(400).json({ message: mongooseError.message });
        }
            else  {
                res.status(500).json(error)
            }
    }
    }   

    async getAllUsers (req: Request, res: Response) { 
        try { 
            const users = await Users.find()
            res.status(200).json(users)
        }
        catch(erorr) {
            return res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }
    
    async updateName (req: Request, res: Response) {
        try {
            const userId = req.user._id
            const {name, about} = req.body
            const user = await Users.findByIdAndUpdate(userId, {'name': name, 'about': about}, {new: true}).orFail(() => {
                const error = new Error(CUSTOM_ERRORS.NO_USER_ERROR) as ErrorWithStatusCode
                error.statusCode = 404
                throw error;
            })

            res.status(200).json(user)
        }
        catch(error) {
            const err = error as ErrorWithStatusCode;

            if (err.statusCode === 404) {
                return res.status(404).json(CUSTOM_ERRORS.NO_USER_ERROR) 
           }

           return res.status(500).json(CUSTOM_ERRORS.NO_USER_ERROR)
        }
    }

    async updateAvatar (req: Request, res: Response) {
        try {
            const userId = req.user._id
            const {avatar} = req.body
            const user = await Users.findByIdAndUpdate(userId, {'avatar': avatar}, {new: true}).orFail(() => {
                const error = new Error(CUSTOM_ERRORS.NO_USER_ERROR) as ErrorWithStatusCode
                error.statusCode = 404
                throw error;
            })

            res.status(200).json(user)
        }
        catch(error) {
            const err = error as ErrorWithStatusCode;

            if (err.statusCode === 404) {
                return res.status(404).json(CUSTOM_ERRORS.NO_USER_ERROR) 
           }

           return res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }
}

export default new UserController()

