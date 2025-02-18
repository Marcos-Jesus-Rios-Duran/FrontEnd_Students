import mongoose from 'mongoose';
import moment from 'moment-timezone';

const studentSchema = new mongoose.Schema({
    student_id: {
        unique: true,
        required: true,
        type: Number
    },
    name: String,
    lastname: String,
    grade: Number,
    group: String,
    average: Number,
    createdAt: { 
        type: Date, 
        default: () => moment().tz("America/Mexico_City").toDate() 
    },
    updatedAt: { 
        type: Date, 
        default: () => moment().tz("America/Mexico_City").toDate() 
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Student', studentSchema);
