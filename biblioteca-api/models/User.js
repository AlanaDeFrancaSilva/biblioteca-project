const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    nif: { type: String },
    rm: { type: String },
    phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);