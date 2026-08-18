const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static getCart(callback) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                callback({ products: [], totalPrice: 0 });
                return;
            }
            callback(JSON.parse(fileContent));
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
          if(err) {
            console.log(err);
            return;
          }
          const cart = JSON.parse(fileContent);
          const updatedCart = { ...cart };
          const productIndex = updatedCart.products.findIndex(prod => prod.id === id);
          if(productIndex < 0) {
            return;
          }
          const productQty = updatedCart.products[productIndex].qty;
          updatedCart.products.splice(productIndex, 1);
          updatedCart.totalPrice = Number(updatedCart.totalPrice) - (Number(productPrice) * productQty);
          fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
          });
        });
    }
};
