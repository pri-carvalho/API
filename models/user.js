const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 50,
    minlength: 3,
    required: [true, "Le prénom est requis !"],
    validate: {
        validator: function (value) {
            return value.length >= 3 && value.length <= 50;
        },
        message: "Le prénom doit contenir entre 3 et 50 caractères !"
    }
  },
  lastname: {
    type: String,
    maxlength: 50,
    minlength: 3,
    required: [true, "Le nom de famille est requis !"],
    validate: {
        validator: function (value) {
            return value.length >= 3 && value.length <= 50;
        },
        message: "Le nom de famille doit contenir entre 3 et 50 caractères !"
    }
  },
  email: { 
    type: String,
    maxlength: 50,
    required: [true, "Une adresse email valide est requis !"],
    unique: true, 
    validate: {
        validator: function (value) {                
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: "Veuillez fournir une adresse email valide !"
    }
  },    
  city: { 
    type: String, 
    maxlength: 50, 
    required: [true, "Une ville est requise !"]
  },
  password: { 
    type: String, 
    minlength: 6, 
    required: [true, "Le mot de passe doit contenir au moins 6 caractères !"]
  },
  isAdmin: { 
    type: Boolean, 
    default: false,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
