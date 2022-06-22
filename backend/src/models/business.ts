import mongoose from 'mongoose'
import User from './user';

const Schema = mongoose.Schema;

let Business = new Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    type:{
        type: Number
    },
    odgLice:{
        type: String
    },
    phone:{
        type: Number
    },
    email:{
        type: String
    },
    title:{
        type: String
    },
    address:{
        type: String
    },
    pib:{
        type: Number
    },
    matBr:{
        type: Number
    }
})

export default mongoose.model('Business', Business, 'businesses');