var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  displayName: String,
  firstName: String,
  lastName: String,
  role: {type: mongoose.Schema.ObjectId, ref: 'UserRole'},
  superAdmin: {type: Boolean, default: false}
});

mongoose.model('User', userSchema);
