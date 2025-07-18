const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  userImageUrl: {
    type: String,
    required: false
  },
  encryptedPassword: {
    type: String,
    required: true
  }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (this.isModified('encryptedPassword')) {
    const saltRounds = 10;
    this.encryptedPassword = await bcrypt.hash(this.encryptedPassword, saltRounds);
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.encryptedPassword);
};

module.exports = mongoose.model('User', UserSchema);
