import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Receipt = new Schema({
    business:{
        type: String,
    },
    value:{
        type: Number
    },
    tax:{
        type: Number
    },
    items:{
        type: Array
    },
    Date:{
        type: Date
    }
})

export default mongoose.model('Receipt', Receipt, 'receipts');