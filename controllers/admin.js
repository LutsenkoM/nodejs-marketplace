const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postAddProduct = (req, res, next) => {
    const {title, imageUrl, price, description} = req.body;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
    const {productId, title, imageUrl, price, description} = req.body;
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        const updatedProduct = new Product(productId, title, imageUrl, description, price);
        updatedProduct.save();
        res.redirect('/admin/products');
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('admin/products', {
            prods: data,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProducts: data.length > 0,
        });
    });
};
