import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import UserSchema from './models/userSchema';
import cardRoute from './routes/cardRoute';

const realId = '65b91c233a2ec53032de1616' 
const fakeID = '65b91c233a2ec53032de1600' 


const PORT = 3000;
const DB_URL =  "mongodb+srv://user:user@mestoserver.380lwqj.mongodb.net/?retryWrites=true&w=majority"
const app = express()
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = {
      _id: realId
    };
  
    next();
  }); 


app.get('/', (req: Request, res: Response) => {
    res.status(200).json("ALL COOL ver2.0")
} )

app.post('/', async(req: Request, res: Response) => {
    try {
        const {name, about, avatar} = req.body
        const user =  await UserSchema.create({name, about, avatar})
        console.log(req.body)
        res.json(user)
    }
    catch(e) {
        res.status(500).json(e)
    }
} )  

app.use('/', cardRoute)

// app.post('/cards', async (req: Request, res: Response) => {
//     try {
//         const {name, link} = req.body
//         const owner = '65b91c233a2ec53032de1616'
//         const card = await CardSchema.create({name, link, owner})
//         console.log(req.body)
//         res.json(card)
//     }
//     catch(e) {
//         res.status(500).json(e)
//     }
// })


// app.get('/cards', async (req: Request, res: Response) => {
//     try {
//         const card = await CardSchema.find().sort({ _id: -1 }).limit(2)
//         console.log(req.body)
//         res.json(card)
//     }
//     catch(e) {
//         res.status(500).json(e)
//     }
// })




async function startAPP() {
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

startAPP()

 
