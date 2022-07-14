import mongoose from 'mongoose'

const Schema = mongoose.Schema;

class Orderer{
    PIB: number;
    title: String;
    address: String;
    category: String;
    days: number;
    tax: number;
    logo: String;
    odgLice: String;
    phone: String;
}

class InventoryItem{
    code: number;
    title: String;
    unit: String;
    tax: number;
    protected: String;
}

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
        type: Array<Orderer>
    },
    inventory:{
        type: Array<InventoryItem>
    },
    tabs:{
        type:  Array<String>
    }
})

export default mongoose.model('Business', Business, 'businesses');