import mongoose, { Schema, models } from 'mongoose';

const peopleWithAccessSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    roomName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Viewer", "Editor"]
    },
    expirationOn: {
        type: Boolean,
        default: true
    },
    expirationDate: {
        type: Date 
    }
}, { timestamps: true });

const Peoplewithaccess = models?.Peoplewithaccess || mongoose.model('Peoplewithaccess', peopleWithAccessSchema);

export default Peoplewithaccess;
