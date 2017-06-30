var mongoose = require('mongoose');

var userRoleSchema = new mongoose.Schema({
  name: String,
  permission: [
    {
      feature: String,
      view: Boolean,
      create: Boolean,
      edit: Boolean,
      delete: Boolean
    }
  ],
  assignable: Boolean
});

mongoose.model('UserRole', userRoleSchema);
