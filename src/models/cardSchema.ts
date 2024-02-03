
import mongoose from "mongoose";



const CardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Owner' },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Owner' }
}, {versionKey: false, timestamps: true})

export default mongoose.model('CardSchema', CardSchema)
