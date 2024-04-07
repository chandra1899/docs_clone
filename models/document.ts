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
            type: String,
            required: true,
            enum: ["Restricted", "In this Organisation", "Any one with link"],
            default: "Restricted"
        },
        peoplewithaccess: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Peoplewithaccess'
        }]
    }
}, { timestamps: true });

const Document = models?.Document || mongoose.model('Document', documentSchema);

export default Document;
