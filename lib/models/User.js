const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS || 8);
});

schema.statics.authorize = function(email, password) {
  return this.findOne({ email })
    .then(user => {
      if(!user) {
        throw new Error('Invalid Email/Password');
      }
      if(!user.compare(password)) {
        throw new Error('Invalid Email/Password');
      }
      return user;
    });
};

schema.methods.compare = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.authToken = function() {
  const token = jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
  return token;
};

schema.statics.tokenToUser = function(token) {
  try {
    const { sub } = jwt.verify(token, process.env.APP_SECRET);
    return this.hydrate(sub);
  } catch{
    const error = new Error(`Invalid or missing token: ${token}`);
    error.status = 401;
    throw error;
  }
};

module.exports = mongoose.model('User', schema);
