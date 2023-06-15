const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    maxlength: 50, 
    required: [true, "Le nom du produit est requis !"]
  },  
  description: { 
    type: String, 
    maxlength: 255, 
    required: [true, "La description du produit est requise !"]
  }, 
  price: { 
    type: Number,         
    required: [true, "Le prix du produit est requis !"]
  },   
  imageUrl: {
    type: [{
        type: String,
        maxlength: 255
    }]
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "Catégorie existante requis !"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Utilisateur existant requis !"]
  },
  isSold: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
