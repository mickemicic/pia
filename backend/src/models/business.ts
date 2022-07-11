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
    },
    activities:{
        type: Array
    },
    pdv:{
        type: Boolean
    },
    accNum:{
        type: Number
    },
    category:{
        type: String
    },
    logo:{
        type: String
    },
    skladista:{
        id: Array<String>,
        naziv: Array<String>
    },
    kase:{
        lokacija: Array<String>,
        tip: Array<String>
    },
    orderers:{
        type: Array<number>
    }
})

export default mongoose.model('Business', Business, 'businesses');