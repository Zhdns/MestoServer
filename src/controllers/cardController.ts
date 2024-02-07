import  {  Request, Response } from 'express';
import Cards from '../models/cardSchema'
import Users from '../models/userSchema'
import { ErrorWithStatusCode } from "../service/types";
import { Error } from 'mongoose';
import { CUSTOM_ERRORS } from '../service/constants';

class CardController {
    
    async postCard (req: Request, res: Response) {
        try {
        const {name, link} = req.body
        const owner = req.user._id

         await Users.findById(owner).orFail(() => {
            const error = new Error(CUSTOM_ERRORS.NO_USER_ERROR) as ErrorWithStatusCode
            error.statusCode = 404
            throw error;
        })

        const card = await Cards.create({name, link, owner})
        console.log(req.body)
        res.status(201).json(card)
        }
        catch(error) {
            const err = error as ErrorWithStatusCode;
            const mongooseErr = error as Error.ValidationError

            if (err.statusCode === 404) {
                return res.status(404).json(CUSTOM_ERRORS.NO_USER_ERROR) 
           }

           else if (mongooseErr?.name === CUSTOM_ERRORS.VALIDATION_ERROR) {
                return res.status(400).json({ message: mongooseErr.message });
           }

           return res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }

    async getAllCards (req: Request, res: Response) { 
        try {
            const card = await Cards.find().sort({ _id: -1 }).limit(20)
            res.status(200).json(card)
        }
        catch(e) {
            res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }

    async deleteSelectedCard (req: Request, res: Response) {
        try {
            const owner = req.user._id
            const {cardId} = req.params
            await Cards.findById(cardId)
            .orFail(() => {
                console.log(cardId)
                const error = new Error(CUSTOM_ERRORS.NO_USER_ERROR) as ErrorWithStatusCode
                error.statusCode = 404
                throw error
            })      
            .then((card) => {
                if (card.owner.toString() !== owner) {
                        console.log
                        console.log(card.owner)
                        console.log(owner)
                        const error = new Error(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR) as ErrorWithStatusCode
                        error.statusCode = 400
                        throw error
                    }
            })  

            const deleteCard = await Cards.findByIdAndDelete(cardId)
            res.status(200).json(deleteCard)

        }
        catch(error) {
            const err = error as ErrorWithStatusCode;
            const mongooseErr = error as Error.CastError

            if (err.statusCode === 404) {
                return res.status(404).json(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR) 
           }

           if (mongooseErr?.name === CUSTOM_ERRORS.CAST_ERROR) {
                return res.status(400).json(CUSTOM_ERRORS.NO_USER_ERROR);
        
           }

           return res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }

    async likeCard (req: Request, res: Response) {
        try { 
            const {cardId} = req.params
            const updatedCard =await Cards.findByIdAndUpdate(
                cardId,{ $addToSet: { likes: req.user._id } }, 
                { new: true },
              )
            .orFail(() => {
                const error = new Error(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR) as ErrorWithStatusCode
                error.statusCode = 404
                throw error  
            })
            res.status(200).json(updatedCard)
        }
        catch(error) {
            const err = error as ErrorWithStatusCode;
            const mongooseErr = error as Error.CastError

            if (err.statusCode === 404) {
                return res.status(404).json(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR) 
           }    
           
           if(mongooseErr?.name === CUSTOM_ERRORS.CAST_ERROR) {
            return res.status(400).json(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR)
           }

           return res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }


    async dislikeCard (req: Request, res: Response) {
        try { 
            const {cardId }= req.params
            const updatedCard = await Cards.findByIdAndUpdate( cardId, 
                { $pull: { likes: req.user._id } as any}, 
                { new: true },
              )
            .orFail(() => {
                const error = new Error(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR) as ErrorWithStatusCode
                error.statusCode = 404
                throw error  
            })

            res.status(200).json(updatedCard)
        }
        catch(error) {
            const err = error as ErrorWithStatusCode;
            const mongooseErr = error as Error.CastError

            if (err.statusCode === 404) {
                return res.status(404).json(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR) 
           }

           if(mongooseErr?.name === CUSTOM_ERRORS.CAST_ERROR) {
            return res.status(400).json(CUSTOM_ERRORS.NO_USER_OR_CARD_ERROR)
           }

           return res.status(500).json(CUSTOM_ERRORS.SERVER_ERROR)
        }
    }


}

export default new CardController()