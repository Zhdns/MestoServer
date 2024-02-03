import { Router } from "express";
import CardController from "../controllers/cardController";


const cardRoute = Router()

cardRoute.get('/cards', CardController.getAllCards)
cardRoute.post('/cards', CardController.postCard)
cardRoute.delete('/cards/:cardId', CardController.deleteSelectedCard)

export default cardRoute