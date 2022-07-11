import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    name:{
        type: String
    },
    phone:{
        type: Number
    },
    id:{
        type: Number
    }
})

export default mongoose.model('User', User, 'users');