import mongoose from 'mongoose'

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
    },
    restaurant:{
        type: Number
    }
})

export default mongoose.model('Business', Business, 'businesses');