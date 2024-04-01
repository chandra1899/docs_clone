import mongoose ,{Schema, models} from 'mongoose'

const documentSchema=new Schema({
    roomName:{
        type:String,
        required:true
    },
    ownedBy : {
        type : String,
        required : true
    },
    content : {
        type : String,
    },
    documentName : {
        type : String,
    }
},{timestamps:true})

const Document = models?.Document || mongoose.model('Document',documentSchema)
export default Document