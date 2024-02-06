import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cardRoute from './routes/cardRoute';
import userRoute from './routes/userRoute';
import { USER_ID } from 'service/constants';



const PORT = 3000;
const DB_URL =  "mongodb+srv://user:user@mestoserver.380lwqj.mongodb.net/?retryWrites=true&w=majority"
const DB_LOCAL = 'mongodb://localhost:27017/mestodb '
const app = express()
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = {
      _id: USER_ID.user_HarryPotter
    };
    next();
  }); 


app.get('/', (req: Request, res: Response) => {
    res.status(200).json("AVADA KEDAVRA")
} )

app.use('/', cardRoute)
app.use('/', userRoute)


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log('SERVER ON PORT' + PORT)
        })
    }
    catch (e) {
        console.log(e)
    }
}

startApp()

 
