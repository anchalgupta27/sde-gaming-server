import mongoose from 'mongoose';

const approvedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  roles: {type: [String], default: ['customer']},
}, { timestamps: true });

export default mongoose.models.ApprovedEmail || mongoose.model('ApprovedEmail', approvedEmailSchema, 'ApprovedEmails');
