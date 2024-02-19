// controllers/productController.js 
const { Product } = require('../models');

const calculatePagination = (totalItems, pageSize, currentPage) => { 
    const totalPages = Math.ceil(totalItems / pageSize); 
    const nextPage = currentPage < totalPages ? currentPage + 1 : null; 
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

return { 
    totalItems, 
    totalPages, 
    currentPage, 
    nextPage, 
    prevPage, 
    }; 
};

exports.getAllProducts = async (req, res) => { 
    try { 
        const products = await Product.findAll(); 
        res.json(products); 
    } 
    catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
};

exports.getProductById = async (req, res) => { 
    const { id } = req.params; 
    try { 
        const product = await Product.findByPk(id); 
        if (product) { 
            res.json(product); 
        } 
        else { 
            res.status(404).json({ error: 'Product not found' }); 
        } 
    } 
    catch (error) { 
        res.status(500).json({ error: error.message });
     }
     };

exports.createProduct = async (req, res) => { 
    const { name, image, price, description, } = req.body; 
    try { 
        const newProduct = await Product.create({ name, image, price, description, }); 
        res.status(201).json(newProduct); 
    } 
    catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
};

exports.updateProduct = async (req, res) => { 
    const { id } = req.params; 
    const { name, image, price, description, } = req.body;
     try { 
        const product = await Product.findByPk(id); 
        if (product) { 
            await product.update({ name, image, price, description, }); 
            res.json(product); 
        } 
        else { 
            res.status(404).json({ error: 'Product not found' });
         } 
    } 
    catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
};

exports.deleteProductById = async (req, res) => { 
    const { id } = req.params; 
    try { 
        const product = await Product.findByPk(id); 
        if (product) { 
            await product.destroy(); 
            res.json({ message: 'Product deleted successfully' });
         } 
         else { 
            res.status(404).json({ error: 'Product not found' });
         } 
        } 
        catch (error) { 
            res.status(500).json({ error: error.message }); 
        } 
    };

// Complete Index route with backend pagination of 10 results 
exports.getProductsWithPagination = async (req, res) => { 
    const page = parseInt(req.query.page) || 1; const pageSize = 10; 
    try { 
        const { count, rows } = await Product.findAndCountAll({ 
            limit: pageSize, offset: (page - 1) * pageSize, });
        const paginationData = calculatePagination(count, pageSize, page);
        res.json({ products: rows, pagination: paginationData });
    }
    catch (error)
    {
        res.status(500).json({ error: error.message }); 
    }
};
