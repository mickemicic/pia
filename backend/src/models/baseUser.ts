import mongoose from 'mongoose'
import user from './user';

const Schema = mongoose.Schema;

let BaseUser = new Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    type:{
        type: String
    },
    name:{
        type: String
    },
    last_name:{
        type: String
    },
    phone:{
        type: Number
    },
    id:{
        type: Number
    }
})

export default mongoose.model('BaseUser', BaseUser, 'baseUsers');