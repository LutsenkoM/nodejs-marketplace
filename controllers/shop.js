const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('shop/product-list', {
            prods: data,
            pageTitle: 'Shop',
            path: '/products',
            hasProducts: data.length > 0,
        });
    });
}

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products',
        });
    });
    console.log(productId);
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('shop/index', {
            prods: data,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: data.length > 0,
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            for (const cartItem of cart.products) {
                const product = products.find(prod => prod.id === cartItem.id);
                if (product) {
                    cartProducts.push({
                        product: product,
                        qty: cartItem.qty,
                        lineTotal: Number(product.price) * cartItem.qty,
                    });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
                totalPrice: cart.totalPrice,
                hasProducts: cartProducts.length > 0,
            });
        });
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });
    console.log('Adding product to cart:', productId);
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect('/cart');
        }
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
};

