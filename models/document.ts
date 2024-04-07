import mongoose, { Schema, models } from 'mongoose';

const documentSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: Object
    },
    documentName: {
        type: String
    },
    share: {
        generalaccess: {
            value : {
                type: String,
                required: true,
                enum: ["Restricted", "In this Organisation", "AnyOne with link"],
                default: "Restricted",
            },
            role : {
                type : String,
                required: true,
                enum: ["Viewer", "Editor"],
                default: "Viewer",
            }
        },
        peoplewithaccess: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Peoplewithaccess'
        }]
    },
    settings : {
        s1 : {
            type : Boolean,
            default : true
        },
        s2 : {
            type : Boolean,
            default : true
        }
    }
}, { timestamps: true });

const Document = models?.Document || mongoose.model('Document', documentSchema);

export default Document;
