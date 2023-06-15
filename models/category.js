const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    maxlength: 50, 
    required: [true, "Le nom est requis !"]
}  
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
