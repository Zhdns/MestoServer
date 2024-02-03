import  {  Request, Response } from 'express';
import CardSchema from "../models/cardSchema";
import UserSchema from '../models/userSchema';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';



const likeCard = (req: Request, res: Response) => CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  
  const dislikeCard = (req: Request, res: Response) => CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )

interface ErrorWithStatusCode extends Error {
    statusCode?: number;
}
  

class CardController {
    
    async postCard (req: Request, res: Response) {
        try {
        const {name, link} = req.body
        const owner = req.user._id
        console.log(owner)

        if (!name || !link || !owner) {
            const error = new Error('Missing required fields') as ErrorWithStatusCode
            error.statusCode = 400
            throw error
        }

         const userExists = await UserSchema.findById(owner).orFail(() => {
            const error = new Error("User not found") as ErrorWithStatusCode
            error.statusCode = 404
            throw error;
        })

        const card = await CardSchema.create({name, link, owner})
        console.log(req.body)
        res.status(200).send(card)
        }
        catch(error) {
            const err = error as ErrorWithStatusCode;

            if (err.statusCode === 404) {
                return res.status(404).send('User is not exist') 
           }

           if (err.statusCode === 400) {
                return res.status(400).send('Missing required fields');
        
           }

           return res.status(500).send('Problem on server')
        }
    }

    async getAllCards (req: Request, res: Response) { 
        try {
            const card = await CardSchema.find().sort({ _id: -1 }).limit(20)
            console.log(card)
            res.json(card)
        }
        catch(e) {
            res.status(500).send('Problem on server')
        }
    }

    async deleteSelectedCard (req: Request, res: Response) {
        try {
            const owner = req.user._id
            const  { id } = req.params
            const card = await CardSchema.findById(id)
            .orFail(() => {
                const error = new Error("User not found") as ErrorWithStatusCode
                error.statusCode = 404
                throw error
            })      
            .then((card) => {
                if (card.owner?.toString() !== owner) {
                        console.log
                        console.log(card.owner)
                        console.log(owner)
                        const error = new Error('Card or User are not found') as ErrorWithStatusCode
                        error.statusCode = 400
                        throw error
                    }
            })  

            // if (card !== null && card.owner?.toString() !== owner) {
            //     console.log
            //     console.log(card.owner)
            //     console.log(owner)
            //     const error = new Error('Card or User are not found') as ErrorWithStatusCode
            //     error.statusCode = 400
            //     throw error
            // }

            const deleteCard = await CardSchema.findByIdAndDelete(id)
            console.log(deleteCard)
            res.status(200).send(deleteCard)

        }
        catch(error) {
            const err = error as ErrorWithStatusCode;

            if (err.statusCode === 404) {
                return res.status(404).send('User or Card is not exist') 
           }

           if (err.statusCode === 400) {
                return res.status(400).send('User is not found');
        
           }

           return res.status(500).send('Problem on server')
        }
    }
}

export default new CardController()