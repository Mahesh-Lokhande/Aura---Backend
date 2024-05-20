import { Product } from "../model/productSchema.js"

export async function fetchProduct(req,res) {
    try {
        const products = await Product.find();
        res.send(products);
        // to update 
        // Product.updateOne
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Something went wrong'});
    }
}


export async function saveProduct(req,res) {
    try {
        const productData = req.body;
        const pdt = new Product(productData);
        res.save(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Something went wrong'});
    }
}