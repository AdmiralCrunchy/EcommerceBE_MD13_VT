// import models
const Product = require('./Product.js');
const Category = require('./Category.js');
const Tag = require('./Tag.js');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
});

// Categories have many Products

Category.hasMany(Product, {
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(ProductTag, {
  through: ProductTag,
  foreignKey: 'product_id'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
