const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    nif: { type: String },
    rm: { type: String },
    phone: { type: String }
});

module.exports = mongoose.model('User', userSchema);